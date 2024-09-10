const DuvidasForm = document.getElementById('form-duvidas');
DuvidasForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(DuvidasForm);
  const nome = formData.get('full-name');
  const contactMethod = formData.get('contact-method');
  const email = formData.get('email');
  const telefone = formData.get('phone');
  const descricao = formData.get('description');
  const assunto = 'Dúvida';

  if (contactMethod === 'email') {
    const contacto = email;
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, contacto, assunto, descricao }),
      });
      const data = await response.json();
      if (response.ok) {
        app.dialog.alert(nome, 'Dúvida registada! Algum membro da equipe entrará em contacto.');
      } else {
        throw new Error(data.message || 'Erro interno ao submeter questão!');
      }
    } catch (e) {
      app.dialog.alert(e.message || 'Lamentamos ' + nome + ', houve um erro ao submeter questão! Tente novamente.');
    }
  } else {
    const contacto = telefone;
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, contacto, assunto, descricao }),
      });
      const data = await response.json();
      if (response.ok) {
        app.dialog.alert(nome, 'Dúvida registada! Algum membro da equipe entrará em contacto.');
      } else {
        throw new Error(data.message || 'Erro interno ao submeter questão!');
      }
    } catch (e) {
      app.dialog.alert(e.message || 'Lamentamos ' + nome + ', houve um erro ao submeter questão! Tente novamente.');
    }
  }

});



const career = document.getElementById('form-softcareer');

career.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(career);
  const data = {
    nome: formData.get('full-name'),
    email: formData.get('email'),
    telefone: formData.get('phone'),
    areaAtuacao: formData.get('atuaction'),
    disponibilidade: formData.get('availability'),
    anosExperiencia: formData.get('experience'),
    habilidadesTecnicas: formData.get('skills'),
    github: formData.get('githubLink'),
    pretensaoSalarial: formData.get('salary'),
    disponibilidadeInicio: {
      dia: formData.get('day'),
      mes: formData.get('month'),
      ano: formData.get('year')
    }
  };

  try {

    const response = await fetch('http://localhost:5000/api/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {

      app.dialog.alert(nome, 'Dúvida registada! Algum membro da equipe entrará em contacto.');
      career.request();

    } else {
      throw new Error(data.message || 'Erro interno ao submeter candidatura!');
    }
  } catch (e) {
    app.dialog.alert(e.message || 'Lamentamos ' + nome + ', houve um erro ao submeter candidatura! Tente novamente.');
  }

});
