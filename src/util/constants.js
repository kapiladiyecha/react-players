export const collectBooks = (libraries) => {
	return libraries.reduce((acc, curVal) => {
		if (curVal?.books?.length > 0) {
			return acc.concat(curVal.books)
		}
		return acc
	}, [])
}
