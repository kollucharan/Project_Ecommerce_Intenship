import React from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const next = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      {currentPage > 1 && <button  className="buttonsforpagination" onClick={() => prev}>prev </button>}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <div>
            <button
              className="buttonsforpagination"
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                backgroundColor: currentPage === page ? "#007bff" : "#f8f9fa",
                color: currentPage === page ? "white" : "black",
                marginRight: "5px",
              }}
            >
              {page}
            </button>
          </div>
        )
      )}
      {currentPage < totalPages && (
        <button  className="buttonsforpagination" onClick={() => next()}> next </button>
      )}
    </div>
  );
}
