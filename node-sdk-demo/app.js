const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')

app.set('view engine', 'ejs')

app.get('/student', (req, res) => {
  const token = jwt.sign({
    id: 'pysanko_x_college_student_0',
    collegeId: 'a4b0db94-0429-4c75-9937-0658973d9a01'
  }, '39b658b5788a044bceca0cfc36fafaa0')

  res.render('student', { token })
})

app.get('/tutor', (req, res) => {
  const token = jwt.sign({
    id: '991aedfe-33b9-45ce-a24c-95e905fa47c4',
    collegeId: 'a4b0db94-0429-4c75-9937-0658973d9a01'
  }, '39b658b5788a044bceca0cfc36fafaa0')

  res.render('tutor', { token })
})

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
