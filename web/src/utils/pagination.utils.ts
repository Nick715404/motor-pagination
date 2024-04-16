export const calculateVisiblePages = (currentPage: number, totalPages: number) => {
  const maxVisiblePages = 5;
  const pageNeighbors = (maxVisiblePages - 1) / 2;
  let startPage = Math.max(1, currentPage - pageNeighbors);
  let endPage = Math.min(totalPages, currentPage + pageNeighbors);

  if (currentPage - pageNeighbors <= 1) {
    endPage = Math.min(endPage + pageNeighbors - (currentPage - startPage), totalPages);
  }

  if (currentPage + pageNeighbors >= totalPages) {
    startPage = Math.max(startPage - (currentPage + pageNeighbors - endPage), 1);
  }

  return { startPage, endPage };
};