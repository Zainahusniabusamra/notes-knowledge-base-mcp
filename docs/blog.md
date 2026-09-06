# From Requirements to a Working MCP Server: My Journey Building Notes Knowledge Base MCP

## Introduction

When I started the NextFlows Academy Cohort #1, my goal was not only to learn what the Model Context Protocol (MCP) is, but to understand how to build something real with it.

Throughout the academy, I gradually moved from learning the basic concepts of MCP to designing, implementing, testing, securing, and documenting my own MCP server.

My project was **Notes Knowledge Base MCP**, a TypeScript-based MCP server that allows an AI assistant to interact with a local collection of Markdown notes.

This is the story of how I built it, the challenges I faced, and what I learned along the way.

## Starting with the Requirements

The first stage was understanding the problem I wanted to solve.

I wanted to create a simple knowledge base from a local folder of notes and allow an AI assistant to interact with those notes through MCP.

The main idea was straightforward:

**A user should be able to ask an AI assistant about their notes, and the assistant should be able to find, retrieve, and create notes through an MCP server.**

Before writing the actual application, I needed to understand how MCP works, how an AI client communicates with an MCP server, and what responsibilities belong to the server itself.

This was also where I started organizing the project requirements and deciding which features were essential for the first version.

## Designing the Tools

After defining the idea, I designed the tools around the main use cases.

The first version focused on three core tools:

* **`search_notes`** — searches the notes directory for matching text.
* **`get_note`** — retrieves a specific note using its identifier.
* **`create_note`** — creates a new Markdown note.

I learned that designing an MCP tool is more than simply creating a function.

The tool needs a clear purpose, well-defined inputs, predictable outputs, and validation that makes sense for an AI client.

I also had to decide which functionality should be part of the first version and which features could be left for future improvements.

## Building the MCP Server

I implemented the server using **TypeScript** and the **MCP SDK**.

The notes are stored as Markdown files inside a local `data/` directory. The server communicates using the **stdio transport**, allowing an MCP-compatible client to communicate with the local server.

I started with the basic server structure and gradually added the project-specific tools.

One of the most useful parts of this stage was seeing the difference between understanding a concept theoretically and actually implementing it. Concepts such as tools, schemas, transports, and clients became much clearer once I had to make them work together.

## Adding Input Validation and Security

Once the basic functionality was working, I focused on making the server safer and more reliable.

I used **Zod** to validate tool inputs before processing them. For example, the `create_note` tool validates the note title, content, and tags.

A simplified example of the validation approach is:

```typescript
const createNoteSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10_000),
});
```

This made the expected input explicit and prevented invalid data from reaching the main logic.

Filesystem access also required special attention.

Because the server works with local files, I needed to make sure a requested note could not be used to access arbitrary locations on the filesystem. I resolved the requested path with `path.resolve()` and verified that the resulting path remained inside the allowed `data/` directory before reading or writing the file.

This protected the server against path traversal attempts such as trying to use `../` to escape the notes directory.

I also added limits for search results and tool outputs.

This stage taught me an important lesson: a tool that works for valid input is not necessarily a reliable tool. Error handling, validation, limits, and security are part of the implementation itself.

## Testing with MCP Inspector

After implementing the tools, I used **MCP Inspector** to test the server.

I tested the main successful scenarios:

* Searching for information in my notes.
* Retrieving an existing note.
* Creating a new note.

I also tested invalid inputs and error scenarios.

For example, when a requested note does not exist, the server should return a safe error instead of exposing filesystem details.

Testing this way helped me understand the actual behavior of the MCP server and identify areas that needed improvement.

## Making Sure the Project Was Reproducible

Another important step was testing the project from a fresh clone.

I cloned the public repository into a separate directory, installed the dependencies, and ran the server again.

The server started successfully, and I was able to inspect the available MCP tools.

This was important because a project should not only work on the developer's machine. Someone else should be able to clone the repository, install the dependencies, and understand how to run it.

This also made me pay more attention to documentation and setup instructions.

## Connecting the Server to Claude Desktop

One of the most exciting moments of the project was connecting the local MCP server to **Claude Desktop**.

Until this point, I had mainly been testing the tools directly.

Connecting the server to an AI client made the purpose of MCP much more visible.

I could ask Claude to search my notes for something such as photosynthesis, and Claude could use the `search_notes` tool to find the relevant note.

I could also ask it to create a new note, demonstrating the complete flow from an AI request to an MCP tool call and then to the local filesystem.

Seeing this interaction working was one of the moments when MCP stopped feeling like an abstract concept and became something I could actually build and use.

## Testing Beyond the Happy Path

While testing the project further, I discovered an important limitation in the current implementation.

The `search_notes` tool searches the **content** of Markdown notes, but it does not currently search note titles.

For example, a keyword that exists only in a note's title may not be returned by a search.

This does not prevent the current version from working, but it is a limitation that affects the search experience. Supporting title-based search would be a useful improvement for a future version.

Finding this kind of limitation was also part of the learning process. Testing is not only about proving that the expected scenario works; it is also about discovering what the current implementation does not handle yet.

## Preparing the Project for Shipping

As the project approached its final stage, I focused on making the repository ready for others to use.

I reviewed the README, documented the requirements and setup process, documented the available tools, and included examples of how the server can be used.

I also reviewed the validation and security measures and made sure the public repository contained everything necessary to understand and run the project without depending on my private files.

The project was then prepared for its public release with a `v1.0.0` tag.

## What I Learned

The project taught me several lessons beyond MCP itself.

I learned how to:

* Understand the relationship between an AI client, MCP server, and tools.
* Design tools around real use cases.
* Define and validate schemas with Zod.
* Work with the MCP SDK and stdio transport.
* Handle filesystem access safely.
* Test MCP tools using MCP Inspector.
* Connect a local MCP server to an AI client.
* Think about invalid inputs and edge cases.
* Make a project reproducible from a public repository.
* Document a technical project clearly.

I also learned that development is iterative. A first working version is only the beginning. Testing often reveals limitations and edge cases that are not obvious during implementation.

## Challenges I Faced

One of my biggest challenges was understanding how the different MCP components fit together.

At the beginning, MCP concepts were new to me. It took hands-on implementation and testing to understand how the server, tools, schemas, transport, and AI client communicate.

Security was another important challenge. Working with the filesystem made me think carefully about what input should be accepted and how to prevent unsafe paths.

Testing also changed the way I looked at the project. Instead of asking only, "Does this work?", I started asking, "What happens when the input is wrong?", "What happens when the note does not exist?", and "What can be improved?"

Those questions helped me improve the project significantly.

## The Final Result

The final result is a public TypeScript MCP server called **Notes Knowledge Base MCP** with three core tools:

`search_notes`, `get_note`, and `create_note`.

The project includes input validation, filesystem safety measures, output limits, testing, documentation, and a reproducible setup.

Most importantly, the server can be connected to an AI client and used to interact with local Markdown notes.

The project started as an academy assignment and became a practical example of how MCP can connect an AI assistant with external tools and local data.

## What's Next?

There are still several directions in which I could take the project.

Some possible improvements include:

* Searching note titles in addition to note content.
* Semantic search instead of simple text matching.
* Tags and filtering.
* Editing and deleting notes.
* More advanced note organization.
* A remotely hosted version of the MCP server.

These features were outside the scope of the first version, but they provide a roadmap for future development.

## Final Reflection

Building Notes Knowledge Base MCP took me through the complete development process: understanding requirements, designing tools, implementing the server, validating inputs, securing filesystem access, testing different scenarios, documenting the project, and connecting it to an AI client.

The experience gave me a much clearer practical understanding of MCP and showed me how an AI assistant can interact with external tools and data through a well-designed server.
