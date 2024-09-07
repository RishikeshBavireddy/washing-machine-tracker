const students = ['Rishikesh', 'Vighnesh', 'Yashaswi', 'Sanjith', 'Ashok', 'Sai Vedamsh', 'Harshil', 'Akhilesh', 'Harsha', 'Rohith', 'Varun', 'Anoop', 'Shubhang', 'Sarthhak', 'Rishabh', 'Madhukar', 'Manas', 'Mahinder', 'Naman', 'Manish', 'Yashwanth', 'Siddarth']; // List of student names

document.addEventListener('DOMContentLoaded', () => {
    const studentSelect = document.getElementById('student');
    
    // Populate dropdown with student names
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student;
        option.textContent = student;
        studentSelect.appendChild(option);
    });
    
    // Load the current student from localStorage and display it
    displayCurrentStudent();
    
    // Load the timer from localStorage and start or update it
    const storedEndTime = localStorage.getItem('timerEndTime');
    if (storedEndTime) {
        const endTime = new Date(storedEndTime).getTime();
        startCountdown(endTime);
    }
});

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const student = document.getElementById('student').value;
    
    // Save user data to localStorage (temporary storage)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name: student });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update the current student display
    displayCurrentStudent();
    
    // Set timer end time and start countdown
    const timerDuration = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds
    const endTime = Date.now() + timerDuration;
    localStorage.setItem('timerEndTime', new Date(endTime).toISOString());
    startCountdown(endTime);
});

function displayCurrentStudent() {
    const currentStudentNameElement = document.getElementById('currentStudentName');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length > 0) {
        currentStudentNameElement.textContent = users[users.length - 1].name;
    } else {
        currentStudentNameElement.textContent = 'No student registered';
    }
}

function startCountdown(endTime) {
    function updateTimer() {
        const remaining = endTime - Date.now();
        
        if (remaining <= 0) {
            notifyUsers();
            document.getElementById('timer').textContent = '00:00:00';
            localStorage.removeItem('timerEndTime');
            return;
        }
        
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        document.getElementById('timer').textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        setTimeout(updateTimer, 1000); // Update every second
    }
    
    updateTimer();
}

function notifyUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const notificationElement = document.getElementById('notifications');
    
    // Clear previous notifications
    notificationElement.innerHTML = '';
    
    users.forEach(user => {
        const notification = document.createElement('p');
        notification.textContent = `Washing is complete, ${user.name}!`;
        notificationElement.appendChild(notification);
    });
    
    // Optionally: Clear user data after notification
    localStorage.removeItem('users');
}
