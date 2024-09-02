/**
 * A higher-order function to handle asynchronous route handlers in Express.
 *
 * @param {Function} fn - The asynchronous route handler function. This function should return a promise.
 * @returns {Function} - An Express middleware function that wraps the provided route handler.
 * It catches any errors thrown by the route handler and passes them to the next middleware (error handler).
 *
 * @example
 *
 * const asyncHandler = require('./path/to/asyncHandler');
 *
 * // Example usage with an Express route
 * app.get('/example', asyncHandler(async (req, res, next) => {
 *   const data = await someAsyncOperation();
 *   res.json(data);
 * }));
 */
export default (fn) => (req, res, next) => {
  fn(req, res, next).catch(next) // Pass errors to Express error handler
}
