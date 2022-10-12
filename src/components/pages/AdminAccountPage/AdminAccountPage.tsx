import React, { useContext, useEffect, useState } from 'react';
import algoliasearch from 'algoliasearch';
import { getFunctions, httpsCallable } from 'firebase/functions';
import {
  InstantSearch, Pagination, SearchBox, Configure, SortBy,
} from 'react-instantsearch-dom';
import { UserContext } from '@/components/app/context/UserContext';
import setToastError from '@/utils/setToastError';
import Header from '@/components/common/Header/Header';
import ToasterContainer from '@/components/common/ToasterContainer/ToasterContainer';
import CustomHits from './CustomHits';
import './adminAccountPage.scss';

function AdminAccountPage() {
  const { user } = useContext(UserContext);

  const [key, setKey] = useState<string>('');

  useEffect(() => {
    const functions = getFunctions();
    const generatePublicKey = httpsCallable(functions, 'generatePublicKey');
    const getPublicKey = async () => {
      await user?.getIdToken()
        .then((idToken) => {
          generatePublicKey(idToken)
            .then((res) => setKey(res.data as string))
            .catch((error: Error) => setToastError(error.message));
        });
    };
    getPublicKey()
      .catch((error: Error) => setToastError(error.message));
  }, [user]);

  const client = algoliasearch('YZKLXAGGBW', `${key}`);

  return (
    <div>
      <Header />
      <div className="adminAccountPage">
        <div className="wrapper">
          <div className="search">
            <InstantSearch
              indexName="testsResults"
              searchClient={client}
            >
              <table className="table">
                <tbody>
                  <tr>
                    <td colSpan={2} className="searchTd">
                      <SearchBox />
                    </td>
                  </tr>
                  <tr>
                    <th>ID</th>
                    <th>EMAIL</th>
                  </tr>
                  <CustomHits />
                  <tr>
                    <td colSpan={2} className="controlTd">
                      <Pagination
                        showFirst
                        showLast
                        showPrevious
                        showNext
                        padding={2}
                        totalPages={100}
                      />
                      <SortBy
                        defaultRefinement="testsResults_email"
                        items={[
                          { value: 'testsResults_email', label: 'Email' },
                          { value: 'testsResults_created_at', label: 'Date of creation' },
                        ]}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <Configure hitsPerPage={2} />
            </InstantSearch>
          </div>
        </div>
      </div>
      <ToasterContainer />
    </div>
  );
}

export default AdminAccountPage;
