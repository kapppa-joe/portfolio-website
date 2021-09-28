const getCurrentSectionId = () => {
  const sections = document.querySelectorAll("section");

  let candidate = "";
  if (scrollY === 0 && sections.length > 0)
    return sections[0].getAttribute("id");
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY > sectionTop - section.clientHeight / 2) {
      candidate = section.getAttribute("id");
    }
  });
  return candidate;
};

const highlightCurrentNavItem = () => {
  const sectionId = getCurrentSectionId();
  const navLi = document.querySelectorAll("#nav-menu li");

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(`menu-item-${sectionId}`)) {
      li.classList.add("active");
    }
  });
};

const startBarChartAnimation = () => {
  const barChartPosY = document.querySelector(".bar-chart").offsetTop;
  if (scrollY + window.innerHeight >= barChartPosY + 100) {
    const bars = document.querySelectorAll(".bar-chart .bar");

    bars.forEach((bar) => (bar.style.animationPlayState = "running"));
  }
};

const setupNavBarHoverEffect = () => {
  const setButtonHoverTypeWriter = (hoverOn, typeTo, str, speed = 80) => {
    const dataContent = document.createAttribute("data-content");
    dataContent.value = "typeTo";
    typeTo.setAttributeNode(dataContent);

    const startTyping = async () => {
      dataContent.value = "";
      for (i = 0; i < str.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, speed));
        dataContent.value = str.slice(0, i + 1);
      }
    };
    hoverOn.addEventListener("mouseenter", startTyping);
  };

  const navLi = document.querySelectorAll("#nav-menu li");
  navLi.forEach((li) => {
    const childSpanElem = li.querySelector("li span");
    const textInChildSpan = childSpanElem.innerHTML;
    let onHoverStr = `.${textInChildSpan.toLowerCase()}()`;
    if (textInChildSpan.includes(" ")) {
      const [a, b] = textInChildSpan.toLowerCase().split(" ");
      onHoverStr = `.${a}(${b})`;
    }
    setButtonHoverTypeWriter(li, childSpanElem, onHoverStr);
  });
};

const setupIntroTypeWriterEffect = () => {
  const setTypeWriterEffect = async (elem, str, speed = 80) => {
    elem.innerHTML = "";
    let i = 0;

    const typeNext = async () => {
      if (i < str.length) {
        const next = str.charAt(i) === "\n" ? "<br \n> &gt;" : str.charAt(i);

        elem.innerHTML += next;
        i++;
        await setTimeout(typeNext, speed);
      }
    };
    await typeNext();
  };

  const intro = document.querySelector("#intro .typewriter");
  setTypeWriterEffect(
    intro,
    "Hey, nice to meet you :) \n My name is Joe Fong."
  );
};

// initialize animation scripts

window.addEventListener("scroll", highlightCurrentNavItem);
window.addEventListener("scroll", startBarChartAnimation);
setupNavBarHoverEffect();
setupIntroTypeWriterEffect();
