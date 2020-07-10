const { getInput, setFailed } = require('@actions/core')
const { handle } = require('./github')

// Run Action.
const run = async () => {
  try {
    const token = getInput('token', { required: true })
    const team = getInput('team', { required: true })
    await handle(token, team)
  } catch (error) {
    setFailed(error.message)
  }
}

run()
