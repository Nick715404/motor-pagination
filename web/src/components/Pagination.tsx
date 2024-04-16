import { calculateVisiblePages } from '@/utils/pagination.utils';
import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from 'next/router';

interface IProps {
  currentPage: number;
  totalPages: number;
}

function BootstrapPagination({ currentPage, totalPages }: IProps) {
  const router = useRouter();

  const handlePageChange = (pageNum: number) => {
    router.push(`/?pageNum=${pageNum}`);
  };

  const renderPages = () => {
    const pages = [];
    const { startPage, endPage } = calculateVisiblePages(currentPage, totalPages);

    if (startPage > 1) {
      pages.push(<Pagination.Ellipsis key="ellipsis-start" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      pages.push(<Pagination.Ellipsis key="ellipsis-end" />);
    }

    return pages;
  };

  return (
    <Pagination>
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
      {renderPages()}
      <Pagination.Next onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
  );
}

export { BootstrapPagination };
