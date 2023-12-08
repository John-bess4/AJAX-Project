const resultsDiv = document.getElementById('results');
const savedEntriesDiv = document.getElementById('savedEntries');
const modalResultsDiv = document.getElementById('modalResults');
const modal = document.getElementById('myModal');

// Set the initial display property of the modal to 'none'
modal.style.display = 'none';

// Function to transform property names (remove underscores and reorder letters)
function transformPropertyName(propertyName) {
  return propertyName.replace(/_/g, ' ').charAt(0).toUpperCase() + propertyName.slice(1);
}

// Function to transform property values (move 'g' or 'mg' to the right of the colon and numbers to the left)
function transformPropertyValue(propertyValue) {
  if (typeof propertyValue === 'string') {
    // Use capturing groups and backreferences to rearrange the value
    // Example: '100g' becomes '100 g'
    return propertyValue.replace(/([\d.]+)\s*([gm]{1,2})/i, '$1 $2');
  }
  return propertyValue;
}

function displayResults(result) {
  modalResultsDiv.textContent = ''; // Clear previous results in the modal

  if (result.length === 0) {
    modalResultsDiv.textContent = 'No results found.';
    showModal();
    return;
  }

  for (const r of result) {
    const ul = document.createElement('ul');
    const nameItem = document.createElement('li');

    nameItem.textContent = r.name.replace(/_/g, ' '); // Replace underscores with spaces in the name
    ul.appendChild(nameItem);

    // for loop to iterate through each property of the current result
    for (const prop in r) {
      if (prop !== 'name') {
        const li = document.createElement('li');
        const modifiedPropName = transformPropertyName(prop.replace(/_/g, ' ')); // Replace underscores with spaces in property name
        const modifiedPropValue = transformPropertyValue(String(r[prop])); // Ensure it's a string and modify the property value
        const propertyText = document.createTextNode(modifiedPropName + ': ' + modifiedPropValue);
        li.appendChild(propertyText);
        li.textContent = li.textContent.charAt(0).toUpperCase() + li.textContent.slice(1);
        ul.appendChild(li);
      }
    }

    // Create a delete button inside a new li tag
    const deleteButtonLi = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deletebtn'); // Add the class name "deletebtn"
    deleteButton.addEventListener('click', function () {
      // Remove the corresponding entry from savedEntriesDiv when the delete button is clicked
      savedEntriesDiv.removeChild(ul);
    });
    deleteButtonLi.appendChild(deleteButton);
    ul.appendChild(deleteButtonLi);

    modalResultsDiv.appendChild(ul);
  }

  showModal();
}

// Function that saves the entries
function saveEntry() {
  const result = modalResultsDiv.querySelector('ul');

  if (!result) {
    return; // No result to save
  }
  const savedUl = result.cloneNode(true);
  savedEntriesDiv.appendChild(savedUl);
  modalResultsDiv.textContent = ''; // Clear the displayed results in the modal
}

document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.querySelector('.saved');
  if (saveButton) {
    saveButton.addEventListener('click', saveEntry);
  }

  // Add event delegation for delete buttons with class "deletebtn"
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('deletebtn')) {
      // Find the closest 'ul' ancestor and remove it
      const ulAncestor = event.target.closest('ul');
      if (ulAncestor) {
        savedEntriesDiv.removeChild(ulAncestor);
      }
    }
  });
});


// New modal code
function showModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function deleteResults() {
  modalResultsDiv.textContent = '';
  closeModal();
}
function saveEntry() {
  const result = modalResultsDiv.querySelector('ul');

  if (!result) {
    return; // No result to save
  }

  const savedUl = document.createElement('ul');

  // Clone each li element
  result.querySelectorAll('li').forEach((li) => {
    savedUl.appendChild(li.cloneNode(true));
  });

  savedEntriesDiv.appendChild(savedUl);
  modalResultsDiv.textContent = ''; // Clear the displayed results in the modal
  closeModal();
}
// Close the modal if the user clicks outside the modal content
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

  // Function to deal with view swapping

document.addEventListener('DOMContentLoaded', function () {
  // Function to handle view swapping
  function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  }

  // View swap function for "Track Cals" button
  window.showCalorieSection = function() {
    showSection('calorieTracker');
  };

  // Add event listener for the "Track Cals" button
  const calTrackBtn = document.getElementById('calTrack');
  if (calTrackBtn) {
    calTrackBtn.addEventListener('click', window.showCalorieSection);
  }

  // Add the following lines to show the initial section
  const initialSectionId = 'load-screen';
  showSection(initialSectionId);

  // Add event listener for the "Get Started" button
  const getStartedButton = document.getElementById('getStartedButton');
  if (getStartedButton) {
    getStartedButton.addEventListener('click', function () {
      // Hide the 'load-screen' section
      const loadScreenSection = document.getElementById('load-screen');
      if (loadScreenSection) {
        loadScreenSection.classList.add('hidden');
      }

      // Show the 'home' section
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.classList.remove('hidden');
      }
    });

  }
});


// Nav menu function
function myFunction() {
  var x = document.getElementById('myLinks');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

// HomePage image carousel
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName('mySlides');
  const dots = document.getElementsByClassName('dot');
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[slideIndex - 1].style.display = 'block';
  dots[slideIndex - 1].className += ' active';
}

// function to switch slides automatically every 5 seconds
function autoSwitchSides() {
  plusSlides(1);
}

// start the slideshow
setInterval(autoSwitchSides, 4000);


