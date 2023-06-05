const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")

const app = express()
const port = 3000

app.use(bodyParser.json())

// Зчитати дані користувачів з файлу users.json
function getUsers() {
  const usersData = fs.readFileSync("users.json")
  return JSON.parse(usersData)
}

// Зберегти користувачів у файл users.json
function saveUsers(users) {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2))
}

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Отримати список облікових записів
 *     description: Отримати список всіх облікових записів.
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає список облікових записів.
 *       500:
 *         description: Помилка сервера.
 */
app.get("/users", (req, res) => {
  const users = getUsers()
  res.json(users)
})

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Створити запис
 *     description: Створює новий запис користувача.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає створений запис користувача.
 *       500:
 *         description: Помилка сервера.
 */
app.post("/users", (req, res) => {
  const users = getUsers()
  const newUser = req.body
  users.push(newUser)
  saveUsers(users)
  res.json(newUser)
})

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Змінити запис
 *     description: Змінює існуючий запис користувача.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID користувача
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає змінений запис користувача.
 *       500:
 *         description: Помилка сервера.
 */
app.put("/users/:id", (req, res) => {
  const users = getUsers()
  const userId = req.params.id
  const updatedUser = req.body
  users[userId] = updatedUser
  saveUsers(users)
  res.json(updatedUser)
})

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Видалити запис
 *     description: Видаляє існуючий запис користувача.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID користувача
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає повідомлення про успішне видалення.
 *       500:
 *         description: Помилка сервера.
 */
app.delete("/users/:id", (req, res) => {
  const users = getUsers()
  const userId = req.params.id
  users.splice(userId, 1)
  saveUsers(users)
  res.sendStatus(200)
})

/**
 * @openapi
 * /users/{id}/tokens:
 *   get:
 *     summary: Отримати список токенів облікового запису
 *     description: Отримує список всіх токенів для облікового запису користувача.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID користувача
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає список токенів облікового запису.
 *       500:
 *         description: Помилка сервера.
 */
app.get("/users/:id/tokens", (req, res) => {
  const users = getUsers()
  const userId = req.params.id
  const user = users[userId]
  res.json(user.tokens)
})

/**
 * @openapi
 * /users/tokens:
 *   get:
 *     summary: Отримати список всіх токенів
 *     description: Отримує список всіх токенів для всіх облікових записів користувачів.
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає список всіх токенів.
 *       500:
 *         description: Помилка сервера.
 */
app.get("/users/tokens", (req, res) => {
  const users = getUsers()
  const allTokens = users.reduce(
    (tokens, user) => [...tokens, ...user.tokens],
    []
  )
  res.json(allTokens)
})

/**
 * @openapi
 * /users/{id}/tokens:
 *   post:
 *     summary: Створити токен
 *     description: Створює новий токен для облікового запису користувача.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID користувача
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає створений токен.
 *       500:
 *         description: Помилка сервера.
 */
app.post("/users/:id/tokens", (req, res) => {
  const users = getUsers()
  const userId = req.params.id
  const { token } = req.body
  users[userId].tokens.push(token)
  saveUsers(users)
  res.json({ token })
})

/**
 * @openapi
 * /users/{id}/tokens/{token}:
 *   put:
 *     summary: Змінити токен
 *     description: Змінює існуючий токен для облікового запису користувача.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID користувача
 *         required: true
 *         schema:
 *           type: integer
 *       - name: token
 *         in: path
 *         description: Токен
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає змінений токен.
 *       500:
 *         description: Помилка сервера.
 */
app.put("/users/:id/tokens/:token", (req, res) => {
  const users = getUsers()
  const userId = req.params.id
  const { token } = req.params
  const { newToken } = req.body
  const user = users[userId]
  const tokenIndex = user.tokens.indexOf(token)
  user.tokens[tokenIndex] = newToken
  saveUsers(users)
  res.json({ token: newToken })
})

/**
 * @openapi
 * /users/{id}/tokens/{token}:
 *   delete:
 *     summary: Видалити токен
 *     description: Видаляє існуючий токен з облікового запису користувача.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID користувача
 *         required: true
 *         schema:
 *           type: integer
 *       - name: token
 *         in: path
 *         description: Токен
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Успішний запит. Повертає повідомлення про успішне видалення.
 *       500:
 *         description: Помилка сервера.
 */
app.delete("/users/:id/tokens/:token", (req, res) => {
  const users = getUsers()
  const userId = req.params.id
  const { token } = req.params
  const user = users[userId]
  const tokenIndex = user.tokens.indexOf(token)
  user.tokens.splice(tokenIndex, 1)
  saveUsers(users)
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
