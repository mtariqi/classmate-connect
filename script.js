document.addEventListener('DOMContentLoaded', function() {
    // Notification bell click
    const notificationBell = document.querySelector('.notification-bell');
    notificationBell.addEventListener('click', function() {
        alert('You have 3 unread notifications:\n- New message in Bioinformatics discussion\n- New assignment posted\n- Sequence Alignment was graded');
    });
    
    // Send message functionality
    const sendButton = document.querySelector('.send-button');
    const messageInput = document.querySelector('.message-input input');
    
    sendButton.addEventListener('click', function() {
        if (messageInput.value.trim() !== '') {
            const messagesContainer = document.querySelector('.messages-container');
            const newMessage = document.createElement('div');
            newMessage.className = 'message sent';
            newMessage.innerHTML = `
                <p>${messageInput.value}</p>
                <div class="message-time">Just now</div>
            `;
            messagesContainer.appendChild(newMessage);
            messageInput.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate a reply after 1-2 seconds
            setTimeout(() => {
                const replyMessage = document.createElement('div');
                replyMessage.className = 'message received';
                replyMessage.innerHTML = `
                    <p>Thanks for your message! I'll get back to you soon.</p>
                    <div class="message-time">Just now</div>
                `;
                messagesContainer.appendChild(replyMessage);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000 + Math.random() * 1000);
        }
    });
    
    // Allow pressing Enter to send message
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
    
    // Chat contact selection
    const chatContacts = document.querySelectorAll('.chat-contact');
    chatContacts.forEach(contact => {
        contact.addEventListener('click', function() {
            chatContacts.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Update the chat header
            const contactName = this.querySelector('h3').textContent;
            const contactAvatar = this.querySelector('.contact-avatar').textContent;
            const messagesHeader = document.querySelector('.messages-header');
            
            messagesHeader.querySelector('.contact-avatar').textContent = contactAvatar;
            messagesHeader.querySelector('h3').textContent = contactName;
            
            // Clear and add new messages
            const messagesContainer = document.querySelector('.messages-container');
            messagesContainer.innerHTML = `
                <div class="message received">
                    <p>Hey there! I'm available to help with bioinformatics coursework.</p>
                    <div class="message-time">Just now</div>
                </div>
            `;
        });
    });
    
    // Post discussion functionality
    const postButton = document.querySelector('.discussion-form button');
    const discussionTextarea = document.querySelector('.discussion-form textarea');
    
    postButton.addEventListener('click', function() {
        if (discussionTextarea.value.trim() !== '') {
            alert('Discussion posted: ' + discussionTextarea.value);
            discussionTextarea.value = '';
        } else {
            alert('Please write something before posting.');
        }
    });
    
    // Classmate search functionality
    const searchInput = document.querySelector('.chat-search input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const contacts = document.querySelectorAll('.chat-contact');
        
        contacts.forEach(contact => {
            const name = contact.querySelector('h3').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                contact.style.display = 'flex';
            } else {
                contact.style.display = 'none';
            }
        });
    });
    
    // Simulate live notifications update
    setInterval(() => {
        const notificationCount = document.querySelector('.notification-count');
        const currentCount = parseInt(notificationCount.textContent);
        notificationCount.textContent = currentCount + 1;
        
        // Flash the notification bell
        notificationBell.style.color = 'var(--accent)';
        setTimeout(() => {
            notificationBell.style.color = 'white';
        }, 500);
    }, 30000); // Every 30 seconds
});
