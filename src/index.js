const { getInput, setFailed } = require('@actions/core')
const { handle } = require('./github')

// Run Action.
const run = async () => {
  try {
    const token = getInput('token', { required: true })
    const reviewers = getInput('reviewers', { required: false })
    const teamReviewers = getInput('team-reviewers', { required: false })
    await handle(token, reviewers, teamReviewers)
  } catch (error) {
    setFailed(error.message)
  }
}

run()
