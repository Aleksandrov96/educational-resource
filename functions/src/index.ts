import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { log } from 'firebase-functions/logger';
import { DocumentData } from '@firebase/firestore';
import { IQuestion } from '../../src/interfaces/IQuestion'
import { IOption } from '../../src/interfaces/IOption';
import { IAnswer } from '../../src/interfaces/IAnswer';
import algoliasearch from 'algoliasearch';

admin.initializeApp();

const db = admin.firestore();

// Adding admin
exports.processSignUpEUROPE = functions
  .region('europe-central2')
  .auth.user().onCreate(async (user) => {
  if (
    user.email &&
    user.email.endsWith('@admin.nix.com')
  ) {
    const customClaims = {
      admin: true,
    };

    try {
      await getAuth().setCustomUserClaims(user.uid, customClaims);
    } catch (error) {
      log(error);
    }
  }
});

// Adding users to the collection
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  const query = db.collection('users').where('email', '==', user.email);
  if (query) {
    await db.collection('users').doc(user.uid).set({ email: user.email });
  } else {
    log(`${user.email} is already exists`)
  }
});

// Fetching test 
exports.onTestFetch = functions.https.onCall(async (id: string) => {
  const data = await db.collection('tests').doc(id).get()
    .then((doc) => doc.data());
  const test: DocumentData | undefined = data;

  test?.questions
    .forEach((question: IQuestion) => question.options
    .forEach((option) => {
      if ('isCorrect' in option) {
        delete option.isCorrect
      }
  }))

  return test;
});

// Calculation of points for passing the test as a percentage
const calculateResult = async (answers: IAnswer[], testId: string) => {
  const testsRef = await db.collection('tests').doc(testId).get()
    .then((doc) => doc.data());

  const sumOfTruthfulAnswers = testsRef?.questions
    .map((question: IQuestion) => question.options
      .filter((option: IOption) => option.isCorrect === true))
    .map((correctAnswers: string | any[]) => correctAnswers.length)
    .reduce((prev: number, cur: number) => prev + cur);

  const points = testsRef?.questions
    .map((question: IQuestion) => question.options
      .filter((option: IOption) => answers
        .find((answer: IAnswer) => answer.selectedAnswerId === option.id) && option.isCorrect === true))
    .flatMap((el: any) => el).length;

    const percentage = Math.round((points / sumOfTruthfulAnswers) * 100);

  return percentage;
}

// Generating a collection of results and sending it on client
exports.onSendResult = functions.https.onCall(async (data, context) => {
  const { testId, answers } = data;

  const answersRef = await db.collection('testsResults').doc(context.auth?.uid as string).get()
    .then((doc) => doc.data());
  const prevAnswers = answersRef?.[testId];

  const resultsRef = await db.collection('testsResults').doc(context.auth?.uid as string).get()
    .then((doc) => doc.data());
  const prevResults = resultsRef;

  const scorePercentage = await calculateResult(answers, testId);

    if (!prevAnswers) {
    db.collection('testsResults').doc(context.auth?.uid as string).set({
      email: context.auth?.token.email,
      created_at: Number(admin.firestore.Timestamp.now().toMillis()),
      visible_by: 'admin',
      ...prevResults,
      [testId]: [
        {
          answers,
          scorePercentage,
        }
      ]
    })  
  } else {
    db.collection('testsResults').doc(context.auth?.uid as string).set({
      email: context.auth?.token.email,
      visible_by: 'admin',
      ...prevResults,
      [testId]: [
        ...prevAnswers,
        {
          answers,
          scorePercentage,
        }
      ]
    })
  };

  return scorePercentage;
});

// Algolia
const client = algoliasearch('YZKLXAGGBW', '944f162b960cdcbda3f0b1a6c0ec6c98');

exports.generatePublicKey = functions.https.onCall(async (idToken) => {

  let publicKey;
  await getAuth()
    .verifyIdToken(idToken)
    .then((claims) => {
      if (claims.admin === true) {
        publicKey = client.generateSecuredApiKey(
          '944f162b960cdcbda3f0b1a6c0ec6c98',
          {
            filters: `visible_by: 'admin'`,
          }
        )
      }
    });
  
  return publicKey;
})
