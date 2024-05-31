let totalMoneyCollected = 0;

document.getElementById('vehicleType').addEventListener('change', function() {
    const slotNumberSelect = document.getElementById('slotNumber');
    slotNumberSelect.innerHTML = '<option value="" disabled selected>Select a slot</option>';
    const vehicleType = this.value;
    const smallSlots = 10;
    const largeSlots = 5;

    if (vehicleType === 'small' || vehicleType === 'large') {
        for (let i = 1; i <= smallSlots; i++) {
            const slotElement = document.getElementById(`slot${i}`);
            if (!slotElement.classList.contains('booked')) {
                const option = document.createElement('option');
                option.value = `slot${i}`;
                option.textContent = `Slot ${i} (Small)`;
                slotNumberSelect.appendChild(option);
            }
        }
    }

    if (vehicleType === 'large') {
        for (let i = 11; i <= smallSlots + largeSlots; i++) {
            const slotElement = document.getElementById(`slot${i}`);
            if (!slotElement.classList.contains('booked')) {
                const option = document.createElement('option');
                option.value = `slot${i}`;
                option.textContent = `Slot ${i} (Large)`;
                slotNumberSelect.appendChild(option);
            }
        }
    }
});

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const slotNumber = document.getElementById('slotNumber').value;
    const slotElement = document.getElementById(slotNumber);

    if (slotElement && !slotElement.classList.contains('booked')) {
        slotElement.classList.add('booked');
        alert(`Successfully booked ${slotNumber}`);
    } else {
        alert('Slot is already booked or invalid slot number.');
    }
});

document.getElementById('exitForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const exitSlotNumber = document.getElementById('exitSlotNumber').value;
    const entryTime = new Date(document.getElementById('entryTime').value);
    const exitTime = new Date(document.getElementById('exitTime').value);
    const slotElement = document.getElementById(exitSlotNumber);

    // Debugging statements
    console.log('Exit Slot Number:', exitSlotNumber);
    console.log('Entry Time:', entryTime);
    console.log('Exit Time:', exitTime);

    if (isNaN(entryTime) || isNaN(exitTime)) {
        alert('Please enter valid entry and exit times.');
        return;
    }

    let baseCharge = 0;

    if (slotElement.classList.contains('small')) {
        baseCharge = 60;
    } else if (slotElement.classList.contains('large')) {
        baseCharge = 100;
    }

    const totalTime = (exitTime - entryTime) / (1000 * 60); // Total time in minutes
    console.log('Total Time (minutes):', totalTime);

    let totalCharge = baseCharge;
    
    if (totalTime > 30) {
        const extraHours = Math.ceil((totalTime - 30) / 60);
        totalCharge += extraHours * 15;
    }

    totalMoneyCollected += totalCharge;
    document.getElementById('chargeResult').textContent = `Total charge for ${exitSlotNumber} is $${totalCharge.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${totalMoneyCollected.toFixed(2)}`;
    slotElement.classList.remove('booked');
});
