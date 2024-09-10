// js/app.js
var app = new Framework7({
    el: '#app',
    name: 'Laboratório Softhard',
    id: 'laboratorio.softhard.it.ao',
    panel: {
        swipe: true,
    },
    dialog: {
        buttonOk: 'Avançar',
        buttonCancel: 'Cancelar',
    },
    routes: [
        {
            path: '/index/',
            url: 'index.html',
            animate: false,
            options: {
                transition: 'f7-circle',
            },
            on: {
                pageInit: function (e, page) {
                    const faqQuestions = document.querySelectorAll('.myapp-faq-question');
                    faqQuestions.forEach(question => {
                        question.addEventListener('click', function () {
                            const answer = this.nextElementSibling;
                            answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
                        });
                    });

                    const counters = document.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        const updateCount = () => {
                            const target = +counter.getAttribute('data-target');
                            const currentNumber = +counter.innerText.replace('+', '');
                            const speed = 500;
                            const increment = target / speed;

                            if (currentNumber < target) {
                                counter.innerText = `${Math.ceil(currentNumber + increment)}+`;
                                setTimeout(updateCount, 1);
                            } else {
                                counter.innerText = `${target}+`;
                            }
                        };

                        updateCount();
                    });
                    document.querySelectorAll('input[name="contact-method"]').forEach((elem) => {
                        elem.addEventListener("change", function () {
                            if (this.value === "email") {
                                document.getElementById("email-field").style.display = "block";
                                document.getElementById("phone-field").style.display = "none";
                                document.getElementById("phone").required = false;
                                document.getElementById("email").required = true; 
                            } else {
                                document.getElementById("email-field").style.display = "none";
                                document.getElementById("phone-field").style.display = "block";
                                document.getElementById("email").required = false;
                                document.getElementById("phone").required = true;
                            }
                        }); 
                    });

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

                        if (email) {
                            const contacto = email;
                            try {
                                const response = await fetch('/api/contact', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ nome, contacto, assunto, descricao }),
                                });
                                const data = await response.json();
                                if (response.ok) {
                                    app.dialog.alert(nome, 'Dúvida registada! Algum membro da equipe entrará em contacto.');

                                    DuvidasForm.reset();

                                } else {
                                    throw new Error(data.message || 'Erro interno ao submeter questão!');
                                }
                            } catch (e) {
                                app.dialog.alert(e.message || 'Lamentamos ' + nome + ', houve um erro ao submeter questão! Tente novamente.');
                            }
                        } else if (telefone){
                            const contacto = telefone;
                            try {
                                const response = await fetch('/api/contact', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ nome, contacto, assunto, descricao }),
                                });
                                const data = await response.json();
                                if (response.ok) {
                                    app.dialog.alert(nome, 'Dúvida registada! Algum membro da equipe entrará em contacto.');

                                    DuvidasForm.reset();

                                } else {
                                    throw new Error(data.message || 'Erro interno ao submeter questão!');
                                }
                            } catch (e) {
                                app.dialog.alert(e.message || 'Lamentamos ' + nome + ', houve um erro ao submeter questão! Tente novamente.');
                            }
                        } else {
                            app.dialog.alert( nome + ' Tem que adicionar uma forma de contacto (email ou número de telefone)');
                        }

                    });

                },
            }
        },
        {
            path: '/about/',
            url: 'about.html',
            animate: false,
            options: {
                transition: 'f7-cover-v',
            },
            on: {
                pageInit: function (e, page) {

                },
            }
        },
        {
            path: '/service/',
            url: 'service.html',
            animate: false,
            options: {
                transition: 'f7-cover',
            },
            on: {
                pageInit: function (e, page) {
                    var swiper = new Swiper(".mySwiper", {
                        slidesPerView: 3,
                        spaceBetween: 20,
                        freeMode: true,
                        autoplay: true,
                        delay: 3000,
                        loop: true,
                        breakpoint: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                    });
                },
            }
        },
        {
            path: '/career/',
            url: 'softcareer.html',
            animate: false,
            options: {
                transition: 'f7-cover',
            },
            on: {
                pageInit: function (e, page) {

                    app.dialog.alert('Obrigado por querer se juntar a nós! Todos os campos')
                    // $(document).ready(function () {

                    // });
                    let currentStep = 0;
                    const steps = $(".form-step");
                    const progressSteps = $(".progress-steps li");

                    function updateStep() {
                        steps.removeClass("active");
                        $(steps[currentStep]).addClass("active");
                        progressSteps.removeClass("active");
                        $(progressSteps[currentStep]).addClass("active");

                        $(".btn-prev").attr("disabled", currentStep === 0);
                        $(".btn-next").toggle(currentStep < steps.length - 1);
                        $(".btn-submit").toggle(currentStep === steps.length - 1);
                    }

                    $(".btn-next").click(function () {
                        if (currentStep < steps.length - 1) {
                            currentStep++;
                            updateStep();
                        }
                    });

                    $(".btn-prev").click(function () {
                        if (currentStep > 0) {
                            currentStep--;
                            updateStep();
                        }
                    });

                    updateStep();

                    const career = document.getElementById('form-softcareer');
                    career.addEventListener('submit', async function (event) {
                        event.preventDefault();

                        const formData = new FormData(career);
                        const nome = formData.get('full-name');
                        const email = formData.get('email');
                        const telefone = formData.get('phone');
                        const areaAtuacao = formData.get('atuaction');
                        const disponibilidade = formData.get('availability');
                        const anosExperiencia = formData.get('experience');
                        const habilidadesTecnicas = formData.get('skills');
                        const github = formData.get('githubLink');
                        const pretensaoSalarial = formData.get('salary');
                        const disponibilidadeInicio = {
                            dia: formData.get('day'),
                            mes: formData.get('month'),
                            ano: formData.get('year')
                        }

                        try {

                            const response = await fetch('/api/job', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    nome, email, telefone, areaAtuacao, disponibilidade, anosExperiencia, habilidadesTecnicas,
                                    github, pretensaoSalarial, disponibilidadeInicio
                                }),
                            });

                            const data = await response.json();
                            if (response.ok) {
                                app.dialog.alert(nome, 'Candidatura registada! Algum membro da equipe entrará em contacto.');
                                career.reset();

                            } else {
                                throw new Error(data.message || 'Erro interno ao submeter candidatura!');
                            }
                        } catch (e) {
                            app.dialog.alert(e.message || 'Lamentamos ' + nome + ', houve um erro ao submeter candidatura! Tente novamente.');
                        }

                    });

                },
            }
        },
        {
            path: '/privacy-policy/',
            url: 'privacy-policy.html',
            animate: false,
            options: {
                transition: 'f7-cover-v',
            },
            on: {
                pageInit: function (e, page) {

                },
            }
        },
        // Outras rotas...
    ],
});

var mainView = app.views.create('.view-main', { url: '/index/' });

const OpenAlertDemo = () => {
    app.dialog.preloader();
    setTimeout(() =>
        app.dialog.close(), 1000); // Mantido para demonstrar, mas pode ser melhorado.
    app.dialog.alert('Falha ao carregar demonstração. Tente mais tarde!');
}

function openChallengeus() {
    app.dialog.preloader();
    setTimeout(() => app.dialog.close(), 1000); // Mantido para demonstrar, mas pode ser melhorado.
    app.dialog.prompt(' Existe algum processo ou tarefa que você gostaria de tornar mais fácil, rápido ou eficiente usando tecnologia? Descreva aqui!', function (desafio) {
        app.dialog.prompt('Informe seu nome', function (nome) {
            app.dialog.prompt(' ' + nome + ' Como gostaria de ser contactado? Insira um email ou nº de telefone válido.', async function (contacto) {
                try {
                    const response = await fetch('/api/challenge', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ nome, contacto, desafio }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        app.dialog.alert(nome, 'agradecemos pelo desafio. Agora iremos validar e colocar a mão na massa!');
                    } else {
                        throw new Error(data.message || 'Erro interno ao submeter o seu desafio!');
                    }
                } catch (e) {
                    app.dialog.alert(e.message || 'Lamentamos ' + nome + ', houve um erro ao submeter o seu desafio! Tente novamente.');
                }
            });
        });
    });
}
