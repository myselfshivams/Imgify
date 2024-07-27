import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSignInAlt, faDownload, faUsers } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Home.module.css'; 
import Navbar from '@/components/Navbar';

const useCases = [
  {
    title: 'Dynamic Branding and Customization',
    icon: faStar, 
  },
  {
    title: 'Login and Signup Pages',
    icon: faSignInAlt,
  },
  {
    title: 'Downloadable Custom Images',
    icon: faDownload,
  },
  {
    title: 'Interactive User Interfaces',
    icon: faUsers,
  },
];

const IndexPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/api/${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageContainer}>
        <h1 className={styles.heading}>Welcome to imgify</h1>

        <div className={styles.cardContainer}>
          {useCases.map((useCase, index) => (
            <div className={styles.card} key={index}>
              <FontAwesomeIcon 
                icon={useCase.icon} 
                className={styles.cardIcon} 
              />
              <h2 className={styles.cardTitle}>{useCase.title}</h2>
            </div>
          ))}
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Enter Text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default IndexPage;