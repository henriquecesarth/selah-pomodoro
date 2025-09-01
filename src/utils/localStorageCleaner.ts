export const localStorageCleaner = () => {
  const localStorageVersionKey = 'app_storage_version';
  const currentVersion = '1.1'; // Atualize este número a cada nova mudança na estrutura de dados

  // Pega a versão salva no localStorage
  const savedVersion = localStorage.getItem(localStorageVersionKey);

  // Se a versão atual for diferente da salva, significa que é a primeira vez que a aplicação
  // está rodando com a nova estrutura.
  if (savedVersion !== currentVersion) {
    // Limpa todo o localStorage
    localStorage.clear();

    // Salva a nova versão para não limpar novamente na próxima vez
    localStorage.setItem(localStorageVersionKey, currentVersion);

    console.log('localStorage limpo devido à atualização de versão.');
  }
};
