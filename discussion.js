document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the topic and options from localStorage
    const topic = localStorage.getItem("topic");
    const options = JSON.parse(localStorage.getItem("options")) || [];

    const topicTitle = document.getElementById("topic-title");
    const optionsContainer = document.getElementById("options-container");

    if (topic) {
        topicTitle.textContent = `Topic: ${topic}`;
    } else {
        topicTitle.textContent = "Topic not available.";
    }

    const storedProsCons = JSON.parse(localStorage.getItem("prosCons")) || {};

    options.forEach((option, index) => {
        const column = document.createElement("div");
        column.className = "option-column";

        // Add option title
        const optionTitle = document.createElement("h3");
        optionTitle.textContent = option;
        column.appendChild(optionTitle);

        // Add pros/cons section
        const prosConsSection = document.createElement("div");
        prosConsSection.className = "option-pros-cons";

        // Create the "Pros" title and button
        const prosContainer = document.createElement("div");
        prosContainer.className = "pros";
        const prosHeader = document.createElement("div");
        prosHeader.className = "pros-header";
        const prosTitle = document.createElement("h4");
        prosTitle.textContent = "Pros";
        prosHeader.appendChild(prosTitle);

        const addProButton = document.createElement("button");
        addProButton.className = "add-button";
        addProButton.textContent = "Add Pro";
        prosHeader.appendChild(addProButton);
        prosContainer.appendChild(prosHeader);

        // Create the "Cons" title and button
        const consContainer = document.createElement("div");
        consContainer.className = "cons";
        const consHeader = document.createElement("div");
        consHeader.className = "cons-header";
        const consTitle = document.createElement("h4");
        consTitle.textContent = "Cons";
        consHeader.appendChild(consTitle);

        const addConButton = document.createElement("button");
        addConButton.className = "add-button";
        addConButton.textContent = "Add Con";
        consHeader.appendChild(addConButton);
        consContainer.appendChild(consHeader);

        const optionKey = `option_${index}`;
        const storedPros = storedProsCons[optionKey]?.pros || [];
        const storedCons = storedProsCons[optionKey]?.cons || [];

        const createPFP = () => {
            const pfp = document.createElement("div");
            pfp.className = "pfp";  // Default profile picture
            return pfp;
        };

        // Display stored pros
        storedPros.forEach(pro => {
            const proElement = document.createElement("div");
            proElement.className = "pro-con-item";
            
            // Create PFP for pro
            const proPFP = createPFP();
            const proTextElement = document.createElement("p");
            proTextElement.className = "pro";
            proTextElement.textContent = pro;

            proElement.appendChild(proPFP);  // Add profile picture
            proElement.appendChild(proTextElement);  // Add pro text
            prosContainer.appendChild(proElement);
        });

        // Display stored cons
        storedCons.forEach(con => {
            const conElement = document.createElement("div");
            conElement.className = "pro-con-item";
            
            // Create PFP for con
            const conPFP = createPFP();
            const conTextElement = document.createElement("p");
            conTextElement.className = "con";
            conTextElement.textContent = con;

            conElement.appendChild(conPFP);  // Add profile picture
            conElement.appendChild(conTextElement);  // Add con text
            consContainer.appendChild(conElement);
        });

        // Handle adding pros
        addProButton.addEventListener("click", () => {
            const proText = prompt("Enter a pro for this option:");
            if (proText) {
                const proElement = document.createElement("div");
                proElement.className = "pro-con-item";
                
                // Create PFP for pro
                const proPFP = createPFP();
                const proTextElement = document.createElement("p");
                proTextElement.className = "pro";
                proTextElement.textContent = proText;

                proElement.appendChild(proPFP);  
                proElement.appendChild(proTextElement);  
                prosContainer.appendChild(proElement);

                storedProsCons[optionKey] = storedProsCons[optionKey] || {};
                storedProsCons[optionKey].pros = [...(storedProsCons[optionKey].pros || []), proText];
                localStorage.setItem("prosCons", JSON.stringify(storedProsCons));
            }
        });

        // Handle adding cons
        addConButton.addEventListener("click", () => {
            const conText = prompt("Enter a con for this option:");
            if (conText) {
                const conElement = document.createElement("div");
                conElement.className = "pro-con-item";
                
                // Create PFP for con
                const conPFP = createPFP();
                const conTextElement = document.createElement("p");
                conTextElement.className = "con";
                conTextElement.textContent = conText;

                conElement.appendChild(conPFP);  
                conElement.appendChild(conTextElement); 
                consContainer.appendChild(conElement);

                storedProsCons[optionKey] = storedProsCons[optionKey] || {};
                storedProsCons[optionKey].cons = [...(storedProsCons[optionKey].cons || []), conText];
                localStorage.setItem("prosCons", JSON.stringify(storedProsCons));
            }
        });

        prosConsSection.appendChild(prosContainer);
        prosConsSection.appendChild(consContainer);

        column.appendChild(prosConsSection);

        optionsContainer.appendChild(column);
    });
});
