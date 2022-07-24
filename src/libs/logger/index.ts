export const log = (error: unknown) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error)
  }
}
