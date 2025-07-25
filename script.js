document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelector('.buttons');

  let currentOperand = '';
  let previousOperand = '';
  let operation = null;

  const updateDisplay = () => {
    // Tampilkan angka yang sedang diketik, atau angka sebelumnya jika operator baru saja ditekan.
    // Jika semuanya kosong, tampilkan '0'.
    display.value = currentOperand || previousOperand || '0';
  };

  const calculate = () => {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    // Jangan menghitung jika tidak ada dua angka
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert('Error: Tidak bisa membagi dengan nol.');
          clear();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }
    // Bulatkan hasil untuk menghindari masalah floating point yang panjang
    currentOperand = (Math.round(result * 1e10) / 1e10).toString();
    operation = null;
    previousOperand = '';
  };

  const chooseOperation = (op) => {
    // Jika belum ada angka yang dimasukkan, jangan lakukan apa-apa.
    if (currentOperand === '') return;
    // Jika sudah ada operasi yang tertunda, hitung hasilnya terlebih dahulu.
    if (previousOperand !== '') {
      calculate();
    }
    // Pindahkan angka saat ini menjadi angka sebelumnya, dan atur operasi baru.
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
  };

  const appendNumber = (number) => {
    // Mencegah penambahan beberapa titik desimal.
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
  };

  const clear = () => {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
  };

  // Menggunakan event delegation untuk listener yang lebih efisien.
  buttons.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    if (target.id === 'clear') clear();
    else if (target.id === 'equals') {
      if (operation && currentOperand) {
        calculate();
        updateDisplay();
      }
    } else if (target.classList.contains('operator')) {
      chooseOperation(target.value);
      updateDisplay();
    } else {
      appendNumber(target.value);
      updateDisplay();
    }
  });

  // Inisialisasi tampilan
  updateDisplay();
});
