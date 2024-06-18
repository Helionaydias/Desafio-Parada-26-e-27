document.addEventListener('DOMContentLoaded', () => {
  $('#cep').mask('00000-000');

  async function fetchAddress(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    return data;
  }

  function limpa_formulario_cep() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
  }

  async function pesquisacep(valor) {
    const cep = valor.replace(/\D/g, '');

    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        document.getElementById('rua').value = '...';
        document.getElementById('bairro').value = '...';
        document.getElementById('cidade').value = '...';
        document.getElementById('uf').value = '...';

        try {
          const address = await fetchAddress(cep);
          if (!address.erro) {
            document.getElementById('rua').value = address.logradouro;
            document.getElementById('bairro').value = address.bairro;
            document.getElementById('cidade').value = address.localidade;
            document.getElementById('uf').value = address.uf;
          } else {
            limpa_formulario_cep();
            alert('CEP não encontrado.');
          }
        } catch (error) {
          limpa_formulario_cep();
          alert('Erro ao buscar CEP.');
        }
      } else {
        limpa_formulario_cep();
        alert('Formato de CEP inválido.');
      }
    } else {
      limpa_formulario_cep();
    }
  }

  document.getElementById('cep').addEventListener('blur', (event) => {
    pesquisacep(event.target.value);
  });
});
