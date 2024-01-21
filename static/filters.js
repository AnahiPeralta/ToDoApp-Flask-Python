document.addEventListener('DOMContentLoaded', function() {
  const statusFilter = document.getElementById('statusFilter');
  const dateFilter = document.getElementById('dateFilter');
  const priorityFilter = document.getElementById('priorityFilter');
  const cards = document.querySelectorAll('.card');

  // Agrega un evento para manejar los cambios en los filtros
          statusFilter.addEventListener('change', filterTasks);
          dateFilter.addEventListener('change', filterTasks);
          priorityFilter.addEventListener('change', filterTasks);

          function filterTasks() {
              const selectedStatus = statusFilter.value;
              const selectedDate = dateFilter.value;
              const selectedPriority = priorityFilter.value;

              // Itera sobre las tarjetas y muestra u oculta según los criterios
              cards.forEach(function(card) {
                  const status = card.querySelector('.status').textContent;
                  const priority = card.querySelector('.priority').textContent;
                  const date = card.querySelector('.date').textContent;

                  const statusMatch = selectedStatus === '' || status === selectedStatus;
                  const priorityMatch = selectedPriority === '' || priority === selectedPriority;
                  const dateMatch = selectedDate === '' || date === selectedDate;

                  // Muestra u oculta la tarjeta según los criterios
                  card.style.display = statusMatch && priorityMatch && dateMatch ? 'block' : 'none';
              });
          }
      });