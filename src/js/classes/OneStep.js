export default class OneStep {
    
    constructor(step) {
        this.step = step;
        this.image = '';
        this.passed = false;
        this.buttons = [];
        this.rightAnswer = '';
        this.givenAnswer = '';
    }
    
    static buttonColor(color) {
        switch (color) {
            case 'blue':
                return 'blue-btn';
            case 'green':
                return 'green-btn';
            case 'red':
                return 'red-btn';
        } 
    }
    
    shuffle () {
        let array = this.buttons;

        for (let i = array.length - 1; i > 0; i -= 1) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    repaintButtons () {
        this.buttons.forEach(button => {
            if (button.name === this.rightAnswer) {
                button.color = OneStep.buttonColor('green');
            }
        });

        if (this.rightAnswer !== this.givenAnswer) {
            this.buttons.forEach(button => {
                if (button.name === this.givenAnswer) {
                    button.color = OneStep.buttonColor('red');
                }
            });
        }

        this.buttons.forEach(button => {
            if (button.name === this.givenAnswer) {
                button.color += ' active';
            }
        });
    }
}
