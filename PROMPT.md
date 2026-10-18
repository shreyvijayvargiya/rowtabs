# The prompt behind RowTabs

RowTabs was built with [Claude Code](https://claude.com/claude-code) from a detailed prompt, on top of an existing codebase (my local-first notes app, [OpenNote](https://github.com/shreyvijayvargiya/opennote)), with a screenshot of the table look I wanted.

This is the prompt, cleaned up for reading. Not one line: a spec.

## The short version

> I need an offline, browser-based app to manage my tables for all kinds of work: clients, blogs, contacts. It needs highly advanced editable table cells and formats like Notion.

## The full prompt

**Goal.** Build "RowTabs": an Airtable alternative for people, open source, everything stored in the browser (IndexedDB). Reuse the OpenNote app shell: sidebar tree, tabs, split view, AI chatbot, themes, MCP config. Keep every UI, theme and color exactly as is, and make the table UI clean like the attached screenshot.

**Replace the editor.** Remove Tiptap. Use TanStack Table. Each table has a name, searching, sorting by header, and filtering. Every cell is editable by default. Tables can contain links to other tables (like pages in a doc). Add drag and drop for rows and columns. Put a sensible cap on rows and columns because IndexedDB is the only storage.

**Cell types.** Text (bold, italic, link), table link (with search), chips (colored, rename and recolor), checkbox, link, image, date (shadcn calendar), phone, slider, OTP, files (zip, csv…), star rating, avatar (cartoon avatars from a dropdown), icon (same picker as the sidebar), and code (HTML, JS, Python with syntax highlighting and a language dropdown like Medium).

**Gallery.** 100 ready-made tables for CRMs, leads, pipelines, digital products, e-commerce and more, each with a preview, a name and what it is for. A searchable dropdown with categories. Search uses Fuse.js and must be forgiving: "table for leads whatsapp" should return the WhatsApp leads table.

**Import and export.** Import CSV and other formats from a modal next to the new-table button. Copy a table as Markdown. Download as PDF, CSV, HTML and Markdown. View the table as SQL, code or React code.

**App.** Sidebar with search, icon dropdown per table, delete confirmation modal. Select all and delete for rows. ⌘K opens a search modal showing tables, gallery examples, the AI chatbot, theme toggle and MCP config. Add a "Getting started" docs page above Map and Config in the sidebar, rendered from Markdown (features, tech stack, AI chatbot, tables, packages, deploying to Vercel, adding a database).

**AI chatbot.** Keep it the same, but change the tools from creating and reading docs to working with tables: read, create, add rows, edit cells, columns and delete (with confirmation).

**Delivery.** Use the existing code, work on a new branch, then write a detailed Medium article as a lead magnet, make a marketing video, and push everything to a new GitHub repository.

## What made it work

- **Existing code to reuse.** The shell (tabs, split view, sidebar, chat, themes) already existed, so the work was the table editor.
- **A screenshot.** One image of the table style I wanted removed a lot of back and forth.
- **Hard constraints.** "No UI or theme or color changes", "cap the rows and columns", "no database", "everything offline".
- **A concrete list.** 16 named cell types and 100 named templates left little to guess.
- **Checking in a browser.** The app was clicked through with automated browser tests (gallery, every cell type, sort, filter, import, export, AI edits) and bugs were fixed from what those showed.

## Honest notes

- It was a long session with follow-up fixes, not one message and one commit. This repo starts from a squashed first commit.
- The AI assistant was tested against a scripted fake model; try it with your own OpenRouter key.
- The demo video was recorded from the real app with scripted browser automation, local text-to-speech and ffmpeg.

Want to build your own? Fork this repo, paste the prompt above into Claude Code, and change the nouns.
