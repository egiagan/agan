$(document).ready(function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Navigation
    $('.nav-item').click(function() {
        const section = $(this).data('section');
        
        // Update active states
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
        
        // Show selected section
        $('.content-section').removeClass('active');
        $(`#${section}Section`).addClass('active');
    });

    // Toggle Handlers
    $('#roleSpecificToggle').change(function() {
        $('#roleOptions').toggleClass('hidden', !this.checked);
    });

    $('#deviceSpecificToggle').change(function() {
        $('#deviceOptions').toggleClass('hidden', !this.checked);
    });

    $('#loginConditionsToggle').change(function() {
        $('#loginConditions').toggleClass('hidden', !this.checked);
    });

    $('#registrationFlowToggle').change(function() {
        $('#registrationFlow').toggleClass('hidden', !this.checked);
    });

    // Custom Logout URL Toggle
    $('#logoutRedirectType').change(function() {
        $('#customLogoutUrl').toggleClass('hidden', $(this).val() !== 'custom');
    });

    // Add Condition Button
    $('.add-condition-btn').click(function() {
        const newCondition = `
            <div class="condition-item">
                <select class="condition-type">
                    <option value="first-time">First-time login</option>
                    <option value="returning">Returning user</option>
                    <option value="inactive">Inactive for 30+ days</option>
                </select>
                <input type="text" placeholder="Redirect URL" class="condition-url">
                <button class="remove-condition">
                    <i data-lucide="x"></i>
                </button>
            </div>
        `;
        $(this).before(newCondition);
        lucide.createIcons();
    });

    // Add Registration Step Button
    $('.add-step-btn').click(function() {
        const stepCount = $('.flow-step').length + 1;
        const newStep = `
            <div class="flow-step">
                <span class="step-number">${stepCount}</span>
                <input type="text" placeholder="/step-${stepCount}" class="step-url">
                <input type="text" placeholder="Step ${stepCount}" class="step-name">
                <button class="remove-step">
                    <i data-lucide="x"></i>
                </button>
            </div>
        `;
        $('.flow-steps').append(newStep);
        lucide.createIcons();
    });

    // Remove Buttons
    $(document).on('click', '.remove-condition', function() {
        $(this).closest('.condition-item').remove();
    });

    $(document).on('click', '.remove-step', function() {
        $(this).closest('.flow-step').remove();
        // Update step numbers
        $('.flow-step').each(function(index) {
            $(this).find('.step-number').text(index + 1);
        });
    });

    // Test URL Button
    $('.test-url-btn').click(function() {
        const url = $(this).prev('input').val();
        if (url) {
            // Simulate URL test
            console.log('Testing URL:', url);
            showNotification('URL test successful!', 'success');
        } else {
            showNotification('Please enter a URL to test', 'error');
        }
    });

    // Save Button Handler
    $('.save-button').click(function() {
        const formData = {
            general: {
                loginEnabled: $('#generalSection .setting-item:nth-child(1) input[type="checkbox"]').is(':checked'),
                registrationEnabled: $('#generalSection .setting-item:nth-child(2) input[type="checkbox"]').is(':checked'),
                logoutEnabled: $('#generalSection .setting-item:nth-child(3) input[type="checkbox"]').is(':checked'),
                fallbackUrl: $('#generalSection input[type="text"]').val()
            },
            login: {
                defaultUrl: $('#loginRedirectUrl').val(),
                roleSpecific: $('#roleSpecificToggle').is(':checked'),
                roles: $('.role-redirect-item').map(function() {
                    const $item = $(this);
                    return {
                        role: $item.find('input[type="checkbox"]').attr('name').replace('role-', ''),
                        enabled: $item.find('input[type="checkbox"]').is(':checked'),
                        url: $item.find('.role-url').val()
                    };
                }).get(),
                conditions: $('.condition-item').map(function() {
                    return {
                        type: $(this).find('.condition-type').val(),
                        url: $(this).find('.condition-url').val()
                    };
                }).get()
            },
            registration: {
                defaultUrl: $('#registrationRedirectUrl').val(),
                deviceSpecific: $('#deviceSpecificToggle').is(':checked'),
                devices: $('.device-redirect-item').map(function() {
                    const $item = $(this);
                    return {
                        device: $item.find('input[type="checkbox"]').attr('name').replace('device-', ''),
                        enabled: $item.find('input[type="checkbox"]').is(':checked'),
                        url: $item.find('.device-url').val()
                    };
                }).get(),
                flow: {
                    enabled: $('#registrationFlowToggle').is(':checked'),
                    steps: $('.flow-step').map(function() {
                        return {
                            url: $(this).find('.step-url').val(),
                            name: $(this).find('.step-name').val()
                        };
                    }).get()
                }
            },
            logout: {
                type: $('#logoutRedirectType').val(),
                customUrl: $('#customLogoutUrl input').val()
            },
            advanced: {
                preserveQueryParams: $('#preserveQueryParams').is(':checked'),
                enableLogging: $('#enableLogging').is(':checked'),
                cacheDuration: $('.card select').val()
            }
        };

        // Simulate saving data
        console.log('Saving settings:', formData);
        showNotification('Settings saved successfully!', 'success');
    });

    // Notification System
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        $('.notification').remove();

        // Create new notification
        const notification = $(`
            <div class="notification ${type}">
                <span>${message}</span>
                <button class="close-notification">
                    <i data-lucide="x"></i>
                </button>
            </div>
        `);

        // Add to document
        $('body').append(notification);
        lucide.createIcons();

        // Animate in
        setTimeout(() => notification.addClass('show'), 100);

        // Auto dismiss
        setTimeout(() => {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        // Close button
        notification.find('.close-notification').click(function() {
            notification.removeClass('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Add notification styles dynamically
    $('<style>')
        .text(`
            .notification {
                position: fixed;
                top: 1rem;
                right: 1rem;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                background: white;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                transform: translateX(120%);
                transition: transform 0.3s ease-in-out;
                z-index: 50;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification.success {
                border-left: 4px solid var(--success-color);
            }
            .notification.error {
                border-left: 4px solid var(--danger-color);
            }
            .close-notification {
                background: none;
                border: none;
                padding: 0.25rem;
                cursor: pointer;
                color: var(--text-secondary);
            }
            .close-notification:hover {
                color: var(--text-primary);
            }
        `)
        .appendTo('head');
});
