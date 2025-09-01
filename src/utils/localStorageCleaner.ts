export const localStorageCleaner = () => {
  const localStorageVersionKey = 'app_storage_version';
  const currentVersion = '1.1'; 

  const savedVersion = localStorage.getItem(localStorageVersionKey);

  if (savedVersion !== currentVersion) {
    localStorage.clear();
    localStorage.setItem(localStorageVersionKey, currentVersion);

    console.log('localStorage limpo devido à atualização de versão.');
  }
};
