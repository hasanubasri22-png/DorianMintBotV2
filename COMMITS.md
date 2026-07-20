# Git Commit Guidelines

## Format

Each commit message consists of a header, body, and footer:

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding tests or updating test code
- **chore**: Changes to build process, dependencies, etc

## Scope

Scope specifies what part of the codebase is affected:

- `wallet` - Wallet operations
- `blockchain` - Blockchain/RPC operations
- `transaction` - Transaction handling
- `database` - Database operations
- `ui` - User interface components
- `crypto` - Cryptographic operations
- `ipc` - Electron IPC
- `config` - Configuration files
- `deps` - Dependency updates

## Subject

- Use imperative, present tense: "add" not "added" or "adds"
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

## Body

- Use imperative, present tense
- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line
- Reference issues and breaking changes

## Footer

- Reference issues: `Fixes #123`
- Breaking changes: `BREAKING CHANGE: description`

## Examples

### Simple fix
```
fix(wallet): correct address validation regex
```

### Feature with body
```
feat(transaction): add batch transfer support

Implement transaction queue system with pause/resume.
Supports multiple recipients and dynamic gas pricing.

Fixes #45
```

### Breaking change
```
refactor(database): change wallet schema

Modify wallet table structure for better indexing.

BREAKING CHANGE: Existing databases require migration
```

## Emoji Guide (Optional)

Add emoji for quick visual reference:

- 🎨 Style changes
- ⚡ Performance improvements
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation
- 🔧 Configuration
- 🗑️ Removals
- 🔐 Security
- 🧪 Tests
- 📦 Dependencies

Example:
```
✨ feat(wallet): add HD wallet generation from mnemonic
```
