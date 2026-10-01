document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const roleSlug = params.get("role");
  
    const role = KEDAILIDA_ROLES[roleSlug];
  
  
    /* --------------------------------------------
       Invalid / missing role
       -------------------------------------------- */
  
    if (!role) {
      window.location.href = "careers.html";
      return;
    }
  
  
    /* --------------------------------------------
       Basic information
       -------------------------------------------- */
  
    document.title = `${role.title} — Kedailida`;
  
    document.getElementById("roleNumber").textContent =
      `${role.number} / CAREERS`;
  
    document.getElementById("roleTitle").textContent =
      role.title;
  
    document.getElementById("roleType").textContent =
      role.type;
  
    document.getElementById("roleLocation").textContent =
      role.setup;
  
    document.getElementById("roleDepartment").textContent =
      role.department;
  
  
    /* --------------------------------------------
       Hero artwork
       -------------------------------------------- */
  
    const roleImage = document.getElementById("roleImage");
  
    roleImage.src = role.image;
    roleImage.alt = `${role.title} artwork`;
  
  
    /* --------------------------------------------
       Description
       -------------------------------------------- */
  
    document.getElementById("roleDescription").textContent =
      role.description;
  
  
    /* --------------------------------------------
       Responsibilities
       -------------------------------------------- */
  
    const responsibilities =
      document.getElementById("roleResponsibilities");
  
    role.responsibilities.forEach((item) => {
  
      const li = document.createElement("li");
  
      li.textContent = item;
  
      responsibilities.appendChild(li);
  
    });
  
  
    /* --------------------------------------------
       Requirements
       -------------------------------------------- */
  
    const requirements =
      document.getElementById("roleRequirements");
  
    role.requirements.forEach((item) => {
  
      const li = document.createElement("li");
  
      li.textContent = item;
  
      requirements.appendChild(li);
  
    });
  
  
    /* --------------------------------------------
       Engagement
       -------------------------------------------- */
  
    document.getElementById("engagementType").textContent =
      role.type;
  
    document.getElementById("engagementSetup").textContent =
      role.setup;
  
    document.getElementById("engagementLocation").textContent =
      role.location;
  
    document.getElementById("engagementDepartment").textContent =
      role.department;
  
  
    /* --------------------------------------------
       Final application
       -------------------------------------------- */
  
    const applicationButton =
      document.getElementById("roleApplyButton");
  
    const subject =
      encodeURIComponent(`${role.title} Application`);
  
    applicationButton.href =
      `mailto:hello@kedailida.com?subject=${subject}`;
  
  });