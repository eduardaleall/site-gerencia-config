class CalculadoraDivisao {
    constructor() {
        this.display = document.getElementById('display');
        this.resultDiv = document.getElementById('result');
        this.currentInput = '';
        this.operator = '';
        this.previousInput = '';
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Botões numéricos e ponto decimal
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.getAttribute('data-value'));
            });
        });
        
        // Botão de divisão
        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => {
                this.setOperation(button.getAttribute('data-value'));
            });
        });
        
        // Botão de igual
        document.getElementById('equals').addEventListener('click', () => {
            this.calculate();
        });
        
        // Botão de limpar
        document.getElementById('clear').addEventListener('click', () => {
            this.clear();
        });
        
        // Botão de backspace
        document.getElementById('backspace').addEventListener('click', () => {
            this.backspace();
        });
        
        // Suporte a teclado
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardInput(event);
        });
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentInput.includes('.')) return;
        
        this.currentInput += number;
        this.updateDisplay();
    }
    
    setOperation(operator) {
        if (this.currentInput === '') return;
        
        if (this.previousInput !== '' && this.operator !== '') {
            this.calculate();
        }
        
        this.operator = operator;
        this.previousInput = this.currentInput;
        this.currentInput = '';
        
        this.updateDisplay();
    }
    
    calculate() {
        if (this.previousInput === '' || this.currentInput === '' || this.operator === '') {
            return;
        }
        
        const num1 = parseFloat(this.previousInput);
        const num2 = parseFloat(this.currentInput);
        
        // Verificar divisão por zero
        if (num2 === 0) {
            this.showResult('Erro: Divisão por zero!', 'error');
            return;
        }
        
        const result = num1 / num2;
        
        // Mostrar resultado formatado
        this.showResult(`${num1} ÷ ${num2} = ${result}`, 'success');
        
        // Atualizar display com o resultado
        this.currentInput = result.toString();
        this.previousInput = '';
        this.operator = '';
        this.updateDisplay();
    }
    
    showResult(message, type) {
        this.resultDiv.textContent = message;
        this.resultDiv.className = 'result';
        this.resultDiv.classList.add(type);
    }
    
    clear() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
        this.updateDisplay();
        this.resultDiv.textContent = '';
        this.resultDiv.className = 'result';
    }
    
    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.updateDisplay();
    }
    
    updateDisplay() {
        let displayValue = '';
        
        if (this.previousInput !== '') {
            displayValue += this.previousInput;
            if (this.operator !== '') {
                displayValue += ' ÷ ';
            }
        }
        
        displayValue += this.currentInput;
        this.display.value = displayValue || '0';
    }
    
    handleKeyboardInput(event) {
        event.preventDefault();
        
        if (event.key >= '0' && event.key <= '9') {
            this.appendNumber(event.key);
        } else if (event.key === '.') {
            this.appendNumber('.');
        } else if (event.key === '/') {
            this.setOperation('/');
        } else if (event.key === 'Enter' || event.key === '=') {
            this.calculate();
        } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
            this.clear();
        } else if (event.key === 'Backspace') {
            this.backspace();
        }
    }
}

// Inicializar a calculadora quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CalculadoraDivisao();
});