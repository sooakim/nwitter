export const log = (error: unknown) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(error)
  }
}
