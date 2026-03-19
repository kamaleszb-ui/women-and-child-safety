document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Elements
    ========================================= */
    const sosBtn = document.getElementById('sos-btn');
    const sosModal = document.getElementById('sos-modal');
    const cancelSosBtn = document.getElementById('cancel-sos-btn');
    const recordingBadge = document.getElementById('recording-badge');
    const riskBanner = document.getElementById('risk-banner');
    const riskLevelText = document.getElementById('risk-level-text');
    const backgroundBlob = document.querySelector('.blob-3');
    
    const qrVerifyBtn = document.getElementById('qr-verify-btn');
    const qrModal = document.getElementById('qr-modal');
    const closeQrModal = document.querySelector('.close-modal');
    const confirmRideBtn = document.getElementById('confirm-ride-btn');

    const childModeToggle = document.getElementById('child-mode-toggle');
    const extrasPanel = document.querySelector('.extras-panel');
    
    const vehicleMarker = document.getElementById('vehicle-marker');
    const deviationZone = document.getElementById('deviation-zone');

    /* =========================================
       Voice SOS Simulation & Manual Trigger
    ========================================= */
    
    // Simulate Speech Recognition setup (Mock)
    let isListening = true;
    
    // Manual Trigger
    sosBtn.addEventListener('click', triggerEmergency);
    
    // Cancel Emergency
    cancelSosBtn.addEventListener('click', () => {
        // In real app, prompt for PIN
        const pin = prompt("Enter 4-digit safety PIN to cancel:");
        if (pin === "1234" || pin === "0000") { // Mock pins
            cancelEmergency();
        } else if(pin !== null) {
            alert("Incorrect PIN.");
        }
    });

    function triggerEmergency() {
        sosModal.classList.add('active');
        recordingBadge.classList.add('active');
        
        // Dynamic styling changes for danger
        document.body.style.background = '#2a0808'; // Dark red tint
        
        // Stop listening for mock 'HELP' once triggered
        isListening = false;
        
        console.log("EMERGENCY: Live Location & Video Recording Started. Authorities Notified.");
    }

    function cancelEmergency() {
        sosModal.classList.remove('active');
        recordingBadge.classList.remove('active');
        document.body.style.background = '';
        isListening = true;
        
        // Reset Risk back to normal dynamically (if it was triggered)
        setRiskLevel('LOW');
    }

    /* =========================================
       AI Risk Detection Simulation
    ========================================= */
    
    // We simulate the risk changing after a few seconds
    setTimeout(() => {
        simulateRouteDeviation();
    }, 12000); // Trigger after 12 seconds for demo purposes
    
    function setRiskLevel(level) {
        // Clear existing classes
        riskBanner.className = 'risk-badge';
        
        if (level === 'LOW') {
            riskBanner.classList.add('risk-low');
            riskBanner.innerHTML = '<i class="fa-solid fa-brain"></i><span>AI Risk: <strong>LOW</strong></span>';
            backgroundBlob.style.opacity = '0.08';
            document.querySelector('.status-dot.connected').style.background = 'var(--accent-green)';
            document.querySelector('.status-dot.connected').style.boxShadow = '0 0 10px var(--accent-green)';
            deviationZone.classList.remove('active');
        } 
        else if (level === 'HIGH') {
            riskBanner.classList.add('risk-high');
            riskBanner.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i><span>AI Risk: <strong>HIGH!</strong></span>';
            
            // Visual indicators of danger
            backgroundBlob.style.background = 'rgba(239, 68, 68, 0.4)';
            backgroundBlob.style.opacity = '1';
            
            document.querySelector('.status-dot.connected').style.background = 'var(--accent-red)';
            document.querySelector('.status-dot.connected').style.boxShadow = '0 0 10px var(--accent-red)';
            
            // Force start covert recording
            recordingBadge.classList.add('active');
            console.log("AI Risk High: Covert Recording Auto-started.");
        }
    }

    function simulateRouteDeviation() {
        // Vehicle moves off path
        vehicleMarker.style.top = '25%';
        vehicleMarker.style.left = '65%';
        
        deviationZone.classList.add('active');
        
        setRiskLevel('HIGH');
        
        // Optional auto-trigger text or toast
        // alert("Warning: Vehicle deviated from optimal route towards isolated area.");
    }
    
    /* Simulate initial map movement */
    setTimeout(() => {
        vehicleMarker.style.top = '40%';
        vehicleMarker.style.left = '50%';
    }, 1000);

    /* =========================================
       Fake Ride Verification (QR Modal)
    ========================================= */
    
    qrVerifyBtn.addEventListener('click', () => {
        qrModal.classList.add('active');
    });

    closeQrModal.addEventListener('click', () => {
        qrModal.classList.remove('active');
    });
    
    confirmRideBtn.addEventListener('click', () => {
        confirmRideBtn.innerHTML = '<i class="fa-solid fa-check"></i> Verified Secured';
        confirmRideBtn.style.background = '#059669'; // Darker green
        
        setTimeout(() => {
            qrModal.classList.remove('active');
            // reset for demo
            setTimeout(() => {
                confirmRideBtn.innerHTML = 'Confirm Matching';
                confirmRideBtn.style.background = '';
            }, 500);
        }, 1500);
    });

    /* =========================================
       Child Safety Mode
    ========================================= */
    
    childModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            extrasPanel.classList.add('child-active');
            
            // Change overall app tint to subtle gold/yellow
            document.documentElement.style.setProperty('--accent-blue', 'var(--accent-yellow)');
            document.documentElement.style.setProperty('--accent-blue-dim', 'rgba(245, 158, 11, 0.2)');
            
            console.log("Child Mode Enabled: Fixed Route and Trusted Driver Only locked in.");
        } else {
            extrasPanel.classList.remove('child-active');
            
            // Restore default colors
            document.documentElement.style.setProperty('--accent-blue', '#00f0ff');
            document.documentElement.style.setProperty('--accent-blue-dim', 'rgba(0, 240, 255, 0.2)');
        }
    });

});
