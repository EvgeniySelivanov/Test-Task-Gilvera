document.addEventListener('DOMContentLoaded', function () {
  const menu_btn = document.getElementById('menu_btn');
  const mob_menu = document.getElementById('nav_mob');

  let isMenuOpen = false;

  window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 996) {
      mob_menu.style.display = 'flex';
      mob_menu.classList.remove('close');
    }
  });
  menu_btn.addEventListener('click', () => {
    if (isMenuOpen) {
      mob_menu.classList.remove('open');
      mob_menu.classList.add('close');

      mob_menu.addEventListener(
        'animationend',
        function handleCloseAnimation() {
          if (!isMenuOpen) {
            mob_menu.style.display = 'none';
          }
          mob_menu.removeEventListener('animationend', handleCloseAnimation);
        }
      );
    } else {
      mob_menu.style.display = 'flex'; // show menu
      mob_menu.classList.remove('close');
      mob_menu.classList.add('open');
    }
    isMenuOpen = !isMenuOpen;
  });
  const customers = Array.from({ length: 96 }, (_, i) => ({
    name: `Customer ${i + 1}`,
    company: `Company ${i + 1}`,
    phone: `+123456789${i}`,
    email: `customer${i + 1}@example.com`,
    country: `Country ${i + 1}`,
    status: i % 2 === 0 ? 'Active' : 'Inactive',
  }));

  const tbody = document.getElementById('tbody');
  const pagination = document.querySelector('.pagination');
  const pagination_text = document.querySelector('.pagination_text');
  const rowsPerPage = 8; // number of entries per page
  let currentPage = 1; //current page

  // show table function
  function displayTable(customers, page = 1) {
    tbody.innerHTML = ''; // clear table
    const start = (page - 1) * rowsPerPage; // start index
    const end = start + rowsPerPage; // finish index
    const pageCustomers = customers.slice(start, end);
    pagination_text.textContent = `Showing data ${start + 1} to ${end} of ${
      customers.length
    }`;
    // filling table
    pageCustomers.forEach((customer) => {
      const row = document.createElement('tr');
      const statusClass =
        customer.status === 'Active' ? 'status-active' : 'status-inactive';
      row.innerHTML = `
      <td>${customer.name}</td>
      <td>${customer.company}</td>
      <td>${customer.phone}</td>
      <td>${customer.email}</td>
      <td>${customer.country}</td>
      <td><span class="${statusClass}">${customer.status}</span></td>
    `;
      console.log(customer.status);

      tbody.appendChild(row);
    });
  }

  //show pagination
  function displayPagination(customers) {
    pagination.innerHTML = ''; // clear pagination
    const totalPages = Math.ceil(customers.length / rowsPerPage);

    // creating  "Prev" btn
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('pagination-btn', 'prev');
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayTable(customers, currentPage);
        displayPagination(customers);
      }
    });
    pagination.appendChild(prevButton);
    // Logic for displaying pages
    const maxButtonsToShow = 5; //maximum number of page buttons to display
    let pageButtons = [];

    if (totalPages <= maxButtonsToShow) {
      //If pages are less than or equal to the maximum number, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(i);
      }
    } else {
      //Show first 2 pages
      pageButtons.push(1, 2);

      // Add ellipsis

      pageButtons.push('...');

      // Show current page and adjacent ones
      if (currentPage - 1 > 2 && currentPage + 1 < totalPages) {
        pageButtons.push(currentPage);
      }

      // Show last 2 pages
      if (totalPages - 2 > currentPage) {
        pageButtons.push(totalPages - 1, totalPages);
      }
    }

    // Creating page buttons
    pageButtons.forEach((page) => {
      const button = document.createElement('button');
      button.textContent = page === '...' ? '...' : page;
      button.classList.add('pagination-btn');

      if (page === currentPage) button.classList.add('active');

      button.addEventListener('click', () => {
        if (page !== '...') {
          currentPage = page;
          displayTable(customers, currentPage);
          displayPagination(customers);
        }
      });

      pagination.appendChild(button);
    });
    // creating "Next" btn

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('pagination-btn', 'next');
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        displayTable(customers, currentPage);
        displayPagination(customers);
      }
    });
    pagination.appendChild(nextButton);
  }

  // show table and pagination
  displayTable(customers, currentPage);
  displayPagination(customers);
});
