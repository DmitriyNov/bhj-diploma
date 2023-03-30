class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const body = document.querySelector('.app');
    const sidebarButton = document.querySelector('.sidebar-toggle');
    sidebarButton.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse'); // Не совсем понимаю, зачем два класса нужно одновременно применить, collapse звучит, как будто меню закрыться должно наоборот 
    });
  }

  static initAuthLinks() {
    const sidebar = document.querySelector('.sidebar');
    const loginButton = sidebar.querySelector('.menu-item_login');
    const registerButton = sidebar.querySelector('.menu-item_register');
    const logoutButton = sidebar.querySelector('.menu-item_logout');
    const registerModal = (App.getModal('register'));
    const loginModal = (App.getModal('login'));
    loginButton.addEventListener('click', () => {
      loginModal.open();
    });
    registerButton.addEventListener('click', () => {
      registerModal.open();
    });
    logoutButton.addEventListener('click', () => {
      User.logout((error, response) => {
        // Не знаю, что тут нужно делать с параметром error
        if (response) {
          App.setState('init');
        }
      })
    });
  }
}