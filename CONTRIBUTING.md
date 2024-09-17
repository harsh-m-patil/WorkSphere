# Contributing to WorkSphere

Thank you for contributing to **WorkSphere**! Please follow the guidelines below to ensure smooth collaboration and maintain code quality.

## General Guidelines

- **JSDoc Comments:**  
  Please document your functions using [JSDoc](https://jsdoc.app/about-getting-started) comments whenever possible.  
  Example:
  ```js
  /**
   * Fetches all users from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  ```

---

## Editor Setup

We recommend the following **VSCode** extensions for consistency:

- **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)** (by Microsoft)  
  Enforces coding standards and identifies potential issues in the code.

- **[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**  
  Automatically formats your code according to our project guidelines.

- **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)**  
  Provides autocomplete and linting support for Tailwind CSS classes.

Ensure these extensions are installed and active to maintain code quality and formatting.

---

## Git Workflow

Follow these steps when working on the project:

1. **Fork the Repository**  
   First, fork the main repository to your GitHub account.

2. **Clone the Fork**  
   Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/your-github-username/WorkSphere.git
   ```

3. **Create a Branch**  
   Create a new branch to work on your feature:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Add Upstream Remote**  
   Set the original repository as the upstream remote:

   ```bash
   git remote add upstream https://github.com/harsh-m-patil/WorkSphere.git
   ```

5. **Write Some Code**  
   Make the necessary changes and improvements to the codebase.

6. **Push Your Code**  
   Once you're ready, push your code to your branch:

   ```bash
   git add .
   git commit -m "feat: Add some feature"
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**  
   Open a pull request against the main repository, explaining your changes clearly.

---

## Writing Async Code

When writing asynchronous code:

- **Avoid `try-catch` blocks**.  
  Instead, use our `asyncHandler()` helper function to simplify error handling.

Example **before**:

```js
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      error: err.message,
    });
  }
};
```

Example **after**:

```js
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    message: "success",
    data: { users },
  });

  if (!users) {
    return next(new AppError("Error finding users", 404));
  }
});
```

### Error Handling

- Use the `AppError` class to throw meaningful errors.
- Pass errors to the next middleware function for centralized handling.
