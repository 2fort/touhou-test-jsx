export default class OneStep {
    
    constructor(step) {
        this.step = step;
        this.image = '';
        this.passed = false;
        this.buttons = [];
        this.rightAnswer = '';
        this.givenAnswer = '';
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
                button.color = 'green';
            }
        });

        if (this.rightAnswer !== this.givenAnswer) {
            this.buttons.forEach(button => {
                if (button.name === this.givenAnswer) {
                    button.color = 'red';
                }
            });
        }

        this.buttons.forEach(button => {
            button.color += ' disabled';
            if (button.name === this.givenAnswer) {
                button.color += ' active';
            }
        });
    }
}
