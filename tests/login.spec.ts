import { test } from '../src/fixtures/test.fixture';

test('[T123] Successful login', async ({ page, pageFactory }) => {
  await page.setContent(`
    <form id="login-form">
      <label for="username">Username</label>
      <input id="username" name="username" type="text" />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" />
      <button type="submit">Sign in</button>
    </form>
    <p data-testid="welcome-message"></p>
    <script>
      const form = document.getElementById('login-form');
      const message = document.querySelector('[data-testid="welcome-message"]');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        message.textContent = 'Welcome, ' + username + '!';
      });
    </script>
  `);

  await pageFactory.loginPage.login('standard_user', 'secret_sauce');
  await pageFactory.loginPage.expectWelcomeMessage('Welcome, standard_user!');
});
