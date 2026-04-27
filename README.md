#  Plano de Corte

Sistema desenvolvido para otimização de planos de corte de chapas, com o objetivo de facilitar o processo de encaixe de peças e gerar arquivos compatíveis com máquinas de corte automatizadas.

---

##  Visão Geral

O **Plano de Corte** é um sistema que permite organizar e otimizar o corte de chapas (como MDF), reduzindo desperdício de material e tempo de produção.  
Ele possibilita o cadastro de peças, chapas e a geração de planos de corte automáticos, além de exportar arquivos no formato XML para softwares e máquinas como **Inmes**.

---

##  Principais Funcionalidades

-  **Geração automática de planos de corte** com base nas dimensões das peças e da chapa disponível.  
-  **Visualização gráfica interativa (Canvas/SVG)** mostrando o posicionamento das peças na chapa.  
-  **Empacotamento linear simples**, encaixando peças em faixas até atingir o limite da largura.  
-  **Cadastro e gerenciamento** de chapas e peças personalizadas.  
-  **Exportação em XML** compatível com  máquinas **Inmes**.  
-  **Arquitetura modular (MVC)** para facilitar manutenção e expansão.  
-  **Integração entre Node.js e React**, conectando backend e interface web de forma fluida.

---

## 🛠️ Tecnologias Utilizadas

**Backend**
- Node.js  
- Express  
- Sequelize (ORM)  
- PostgreSQL  

**Frontend**
- React.js  
- Vite  

**Outros**
- XML Builder  
- Canvas / SVG para renderização gráfica  

---

Que nem expliquei em sala, a ideia era fazer um plano de corte, mudei um pouco a ideia, vai ser ERP 

https://docs.google.com/document/d/1w0n5aMYrzFxjx-7WGiwrhXAixaPlj748ACu_uD8jkuY/edit?usp=sharing
