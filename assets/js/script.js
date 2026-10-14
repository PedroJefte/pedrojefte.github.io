'use strict';

// Abre e fecha os contatos da barra lateral no celular
const sidebar = document.querySelector("[data-sidebar]");
document.querySelector("[data-sidebar-btn]").addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Navegação entre as abas (Sobre, Resumo, Portfólio, Contato)
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const alvo = this.dataset.navLink;
    pages.forEach(function (page) {
      page.classList.toggle("active", page.dataset.page === alvo);
    });
    navLinks.forEach(function (outro) {
      outro.classList.toggle("active", outro === link);
    });
    window.scrollTo(0, 0);
  });
});

// Filtro de projetos por categoria
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const select = document.querySelector("[data-select]");
const selectValue = document.querySelector("[data-select-value]");

const filtrar = function (categoria) {
  filterItems.forEach(function (item) {
    item.classList.toggle("active", categoria === "todos" || item.dataset.category === categoria);
  });
};

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (outro) { outro.classList.remove("active"); });
    this.classList.add("active");
    selectValue.innerText = this.innerText;
    filtrar(this.dataset.filterBtn);
  });
});

// Versão em lista suspensa do filtro, usada no celular
select.addEventListener("click", function () {
  this.classList.toggle("active");
});

document.querySelectorAll("[data-select-item]").forEach(function (item) {
  item.addEventListener("click", function () {
    selectValue.innerText = this.innerText;
    select.classList.remove("active");
    filtrar(this.dataset.selectItem);
  });
});

// Card do projeto: ao clicar num projeto, abre um card com resumo e links
const modal = document.querySelector("[data-project-modal]");
const modalConteudo = document.querySelector("[data-project-content]");

document.querySelectorAll("[data-project-open]").forEach(function (link) {
  link.addEventListener("click", function (evento) {
    evento.preventDefault();
    const detalhes = this.parentElement.querySelector("[data-project-details]");
    modalConteudo.replaceChildren(detalhes.content.cloneNode(true));
    modal.showModal();
  });
});

document.querySelector("[data-project-close]").addEventListener("click", function () {
  modal.close();
});

// Fecha ao clicar fora do card
modal.addEventListener("click", function (evento) {
  if (evento.target === modal) modal.close();
});
