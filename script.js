document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.getAttribute("id");

    if (currentPage === null) {
        // Handle "Create Topic" page
        const topicInput = document.getElementById("topic-input");
        const optionsContainer = document.getElementById("options-container");
        const addOptionBtn = document.getElementById("add-option");
        const proceedVoteBtn = document.getElementById("proceed-vote");

        const voterList = document.getElementById("voter-list"); // Voter selection

        addOptionBtn.addEventListener("click", () => {
            const newOption = document.createElement("input");
            newOption.type = "text";
            newOption.className = "option-input";
            newOption.placeholder = `Option ${optionsContainer.children.length + 1}`;
            optionsContainer.appendChild(newOption);
        });

        proceedVoteBtn.addEventListener("click", () => {
            const topic = topicInput.value.trim();
            const options = Array.from(optionsContainer.querySelectorAll(".option-input"))
                .map(input => input.value.trim())
                .filter(option => option);

            const selectedVoters = Array.from(voterList.selectedOptions).map(option => option.value);

            if (!topic) {
                alert("Please enter a topic.");
                return;
            }

            if (options.length < 2) {
                alert("Please enter at least two options.");
                return;
            }

            if (selectedVoters.length === 0) {
                alert("Please select at least one voter.");
                return;
            }

            localStorage.setItem("topic", topic);
            localStorage.setItem("options", JSON.stringify(options));
            localStorage.setItem("votes", JSON.stringify(new Array(options.length).fill(0)));
            localStorage.setItem("voters", JSON.stringify(selectedVoters)); // Save voters

            window.location.href = "vote.html";
        });
    } else if (currentPage === "vote-page") {
        // Handle "Vote on Options" page
        const topicTitle = document.getElementById("topic-title");
        const optionsButtons = document.getElementById("options-buttons");
        const finalizeVoteBtn = document.getElementById("finalize-vote");
        const simulateButton = document.getElementById("simulate-users");

        const topic = localStorage.getItem("topic");
        const options = JSON.parse(localStorage.getItem("options"));
        let votes = JSON.parse(localStorage.getItem("votes"));
        const numVoters = JSON.parse(localStorage.getItem("voters")).length + 1; // Get voters

        topicTitle.textContent = `Topic: ${topic}`; // Display voters

        let selectedButton = null;
        let isSimulateMode = false;  

        simulateButton.addEventListener("click", () => {
            isSimulateMode = !isSimulateMode;
            if (isSimulateMode) {
                document.body.classList.add("simulate-mode");
                simulateButton.textContent = "Switch to Regular Mode";
            } else {
                document.body.classList.remove("simulate-mode");
                simulateButton.textContent = "Simulate Multiple Users";
            }
        });

        // Handle Feedback Section
        const giveFeedbackBtn = document.getElementById("give-feedback");
        const feedbackText = document.getElementById("feedback-text");
        const submitFeedbackBtn = document.getElementById("submit-feedback");

        giveFeedbackBtn.addEventListener("click", () => {
            feedbackText.style.display = 'block';
            submitFeedbackBtn.style.display = 'block';
            giveFeedbackBtn.disabled = true; 
        });

        submitFeedbackBtn.addEventListener("click", () => {
            const feedback = feedbackText.value.trim();
            if (feedback) {
                alert("Thank you for your feedback!");
                localStorage.setItem("feedback", feedback); // Optionally store feedback
                feedbackText.style.display = 'none';
                submitFeedbackBtn.style.display = 'none';
                giveFeedbackBtn.disabled = false; 
                feedbackText.value = ''; // Clear the feedback
            } else {
                alert("Please write your feedback before submitting.");
            }
        });

        options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = `${option} (${votes[index]} votes)`;
            button.className = "option-button";

            button.addEventListener("click", () => {
                if (isSimulateMode) {
                    votes[index]++;
                    selectedButton = null;
                } else {
                    if (selectedButton) {
                        selectedButton.style.backgroundColor = '';  // Reset background color
                        const selectedIndex = options.indexOf(selectedButton.textContent.split('(')[0].trim());
                        votes[selectedIndex]--;
                        selectedButton.textContent = `${options[selectedIndex]} (${votes[selectedIndex]} votes)`;
                    }

                    selectedButton = button;
                    button.style.backgroundColor = '#45a049';  // Highlight selected button
                    votes[index]++;
                }

                button.textContent = `${option} (${votes[index]} votes)`;
                localStorage.setItem("votes", JSON.stringify(votes));  // Save the updated votes
            });

            optionsButtons.appendChild(button);
        });

        finalizeVoteBtn.addEventListener("click", () => {
            const maxVotes = Math.max(...votes);
            const mostPopularOptions = options.filter((_, index) => votes[index] === maxVotes);
            const numVotes = votes.reduce((total, vote) => total + vote, 0); // Sum all the votes

            if (numVotes < numVoters) {
                alert(`Votes cannot be finalized until everyone has voted! There are ${numVoters - numVotes} votes needed.`);
                return;
            }

            if (mostPopularOptions.length > 1) {
                alert("It's a tie! Revote will be initiated.");
                selectedButton = null;

                const tiedIndices = options
                    .map((option, index) => votes[index] === maxVotes ? index : -1)
                    .filter(index => index !== -1);

                votes.forEach((_, index) => {
                    if (tiedIndices.includes(index)) {
                        votes[index] = 0;
                    }
                });

                optionsButtons.innerHTML = '';  // Clear existing buttons

                tiedIndices.forEach((index) => {
                    const button = document.createElement("button");
                    button.textContent = `${options[index]} (${votes[index]} votes)`;
                    button.className = "option-button";
                    button.addEventListener("click", () => {
                        if (isSimulateMode) {
                            votes[index]++;
                            selectedButton = null;
                        } else {
                            if (selectedButton) {
                                selectedButton.style.backgroundColor = '';
                                const selectedIndex = options.indexOf(selectedButton.textContent.split('(')[0].trim());
                                votes[selectedIndex]--;
                                selectedButton.textContent = `${options[selectedIndex]} (${votes[selectedIndex]} votes)`;
                            }
                            selectedButton = button;
                            button.style.backgroundColor = '#45a049';
                            votes[index]++;
                        }
                        button.textContent = `${options[index]} (${votes[index]} votes)`;
                        localStorage.setItem("votes", JSON.stringify(votes));  // Save the updated votes
                    });
                    optionsButtons.appendChild(button);
                });
            } else {
                const winnerIndex = votes.indexOf(maxVotes);
                localStorage.setItem("final-decision", options[winnerIndex]);
                window.location.href = "result.html";
            }
        });
    } else if (currentPage === "result-page") {
        const finalDecision = document.getElementById("final-decision");
        const decision = localStorage.getItem("final-decision");
        const topic = localStorage.getItem("topic");

        finalDecision.textContent = `The group has decided on: ${decision} (Topic: ${topic})`;

        const newDecisionBtn = document.getElementById("new-decision");
        newDecisionBtn.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "index.html";
        });
    }
});
