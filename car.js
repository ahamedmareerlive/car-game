class Car {
    constructor(x, y, number) {
        this.x = x;
        this.y = y;
        this.bodyColor = "#000";
        this.windowColor = "red";
        this.number = number;

        this.setRandomColor(this, 'bodyColor');
        this.setRandomColor(this, 'windowColor');
    }

    draw(ctx) {
        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.x, this.y, 100, 50);

        ctx.fillStyle = this.windowColor;
        ctx.fillRect(this.x + 10, this.y + 10, 30, 20);
        ctx.fillRect(this.x + 60, this.y + 10, 30, 20);

        ctx.fillStyle = 'black';
        ctx.font = 'bold 12px Arial';
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.strokeText(this.number, this.x + 20, this.y + 35);
        ctx.fillText(this.number, this.x + 20, this.y + 35);

        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x + 10, this.y + 55, 20, 15);
        ctx.fillRect(this.x + 70, this.y + 55, 20, 15);
    }

    async setRandomColor(context, key) {
        const response = await fetch(`https://www.colr.org/json/color/random?query&timestamp=${new Date().getTime()}`);
        if (response.ok) {
            const data = await response.json();
            context[key] = "#"+data.new_color;
        }
    }

}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cars = [];

// Function to generate a random color from a color API


// Function to draw all cars on the canvas
function drawCars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cars.forEach(car => car.draw(ctx));
}

// Function to start the race
function startRace() {
    const raceInterval = setInterval(() => {
        drawCars();
        cars.forEach(car => {
            car.x -= Math.floor(Math.random() * 6) + 1;
            if (car.x <= 0) {
                clearInterval(raceInterval);
                alert('Car ' + car.number + ' won the race!');
            }
        });
    }, 100);
}



// Initialize the cars
for (let i = 0; i < 4; i++) {
    const car = new Car(canvas.width - 120, (i * 100) + 10, i + 1);
    cars.push(car);
}

// Draw the initial cars
drawCars();