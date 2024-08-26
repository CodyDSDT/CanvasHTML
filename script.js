let contentCount = 1;
let quillInstances = [];

function addContentGroup() {
    contentCount++;
    const contentAreas = document.getElementById('content-areas');

    const contentGroup = document.createElement('div');
    contentGroup.className = 'content-group';
    contentGroup.innerHTML = `
        <label for="heading-input-${contentCount}">Enter Heading ${contentCount}:</label>
        <textarea id="heading-input-${contentCount}" class="heading-input" placeholder="Type your heading here..."></textarea>
        
        <label for="paragraph-input-${contentCount}">Enter Paragraph ${contentCount}:</label>
        <div id="paragraph-editor-${contentCount}" class="paragraph-editor"></div>
    `;

    contentAreas.appendChild(contentGroup);

    // Initialize Quill for the new paragraph editor with version 2
    let quill = new Quill(`#paragraph-editor-${contentCount}`, {
        theme: 'snow',
    });
    quillInstances.push(quill);
}

function removeContentGroup() {
    if (contentCount > 1) {
        const contentAreas = document.getElementById('content-areas');
        contentAreas.removeChild(contentAreas.lastChild);
        quillInstances.pop();  // Remove the last Quill instance
        contentCount--;
    }
}

function updateStylePreview() {
    const style = document.getElementById('style-select').value;
    const previewElement = document.getElementById('style-preview');
    let previewHTML = '';

    const exampleHeading = "Example Heading";
    const exampleParagraph = "This is an example paragraph to show how this style will look. It will give you an idea of the formatting before generating your content.";

    if (style === 'style1') {
        previewHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 8px;">
            <h2 style="color: #0073e6;">${exampleHeading}</h2>
            <p style="color: #333;">${exampleParagraph}</p>
        </div>`;
    } else if (style === 'style2') {
        previewHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-left: 5px solid #0073e6;">
            <h2 style="color: #005bb5;">${exampleHeading}</h2>
            <p style="color: #444;">${exampleParagraph}</p>
        </div>`;
    } else if (style === 'style3') {
        previewHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: #eef; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">${exampleHeading}</h2>
            <p style="color: #555;">${exampleParagraph}</p>
        </div>`;
    }

    previewElement.innerHTML = previewHTML;
}

function generateHTML() {
    const style = document.getElementById('style-select').value;
    let htmlOutput = '';

    for (let i = 1; i <= contentCount; i++) {
        const heading = document.getElementById(`heading-input-${i}`).value;
        const paragraph = quillInstances[i - 1].root.innerHTML;

        if (style === 'style1') {
            htmlOutput += `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 8px;">
                <h2 style="color: #0073e6;">${heading}</h2>
                <p style="color: #333;">${paragraph}</p>
            </div>`;
        } else if (style === 'style2') {
            htmlOutput += `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: #f9f9f9; border-left: 5px solid #0073e6;">
                <h2 style="color: #005bb5;">${heading}</h2>
                <p style="color: #444;">${paragraph}</p>
            </div>`;
        } else if (style === 'style3') {
            htmlOutput += `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px; background: #eef; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333;">${heading}</h2>
                <p style="color: #555;">${paragraph}</p>
            </div>`;
        }
    }

    document.getElementById('output').textContent = htmlOutput;
}

// Initialize Quill for the first paragraph editor on page load with version 2
document.addEventListener("DOMContentLoaded", function() {
    let quill = new Quill('#paragraph-editor-1', {
        theme: 'snow',
    });
    quillInstances.push(quill);

    // Call updateStylePreview initially to show the preview of the default selected style
    updateStylePreview();
});
