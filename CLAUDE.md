# Claude Code Configuration

## Build Commands
- `npm run build`: Build the project
- `npm run test`: Run the full test suite
- `npm run lint`: Run ESLint and format checks
- `npm run typecheck`: Run TypeScript type checking
- `./claude-flow --help`: Show all available commands

## Claude-Flow Complete Command Reference

### Core System Commands
- `./claude-flow start [--ui] [--port 3000] [--host localhost]`: Start orchestration system with optional web UI
- `./claude-flow status`: Show comprehensive system status
- `./claude-flow monitor`: Real-time system monitoring dashboard
- `./claude-flow config <subcommand>`: Configuration management (show, get, set, init, validate)

### Agent Management
- `./claude-flow agent spawn <type> [--name <name>]`: Create AI agents (researcher, coder, analyst, etc.)
- `./claude-flow agent list`: List all active agents
- `./claude-flow spawn <type>`: Quick agent spawning (alias for agent spawn)

### Task Orchestration
- `./claude-flow task create <type> [description]`: Create and manage tasks
- `./claude-flow task list`: View active task queue
- `./claude-flow workflow <file>`: Execute workflow automation files

### Memory Management
- `./claude-flow memory store <key> <data>`: Store persistent data across sessions
- `./claude-flow memory get <key>`: Retrieve stored information
- `./claude-flow memory list`: List all memory keys
- `./claude-flow memory export <file>`: Export memory to file
- `./claude-flow memory import <file>`: Import memory from file
- `./claude-flow memory stats`: Memory usage statistics
- `./claude-flow memory cleanup`: Clean unused memory entries

### SPARC Development Modes
- `./claude-flow sparc "<task>"`: Run orchestrator mode (default)
- `./claude-flow sparc run <mode> "<task>"`: Run specific SPARC mode
- `./claude-flow sparc tdd "<feature>"`: Test-driven development mode
- `./claude-flow sparc modes`: List all 17 available SPARC modes

Available SPARC modes: orchestrator, coder, researcher, tdd, architect, reviewer, debugger, tester, analyzer, optimizer, documenter, designer, innovator, swarm-coordinator, memory-manager, batch-executor, workflow-manager

### Swarm Coordination
- `./claude-flow swarm "<objective>" [options]`: Multi-agent swarm coordination
- `--strategy`: research, development, analysis, testing, optimization, maintenance
- `--mode`: centralized, distributed, hierarchical, mesh, hybrid
- `--max-agents <n>`: Maximum number of agents (default: 5)
- `--parallel`: Enable parallel execution
- `--monitor`: Real-time monitoring
- `--output <format>`: json, sqlite, csv, html

### MCP Server Integration
- `./claude-flow mcp start [--port 3000] [--host localhost]`: Start MCP server
- `./claude-flow mcp status`: Show MCP server status
- `./claude-flow mcp tools`: List available MCP tools

### Claude Integration
- `./claude-flow claude auth`: Authenticate with Claude API
- `./claude-flow claude models`: List available Claude models
- `./claude-flow claude chat`: Interactive chat mode

### Session Management
- `./claude-flow session`: Manage terminal sessions
- `./claude-flow repl`: Start interactive REPL mode

### Enterprise Features
- `./claude-flow project <subcommand>`: Project management (Enterprise)
- `./claude-flow deploy <subcommand>`: Deployment operations (Enterprise)
- `./claude-flow cloud <subcommand>`: Cloud infrastructure management (Enterprise)
- `./claude-flow security <subcommand>`: Security and compliance tools (Enterprise)
- `./claude-flow analytics <subcommand>`: Analytics and insights (Enterprise)

### Project Initialization
- `./claude-flow init`: Initialize Claude-Flow project
- `./claude-flow init --sparc`: Initialize with full SPARC development environment

## Quick Start Workflows

### Research Workflow
```bash
# Start a research swarm with distributed coordination
./claude-flow swarm "Research modern web frameworks" --strategy research --mode distributed --parallel --monitor

# Or use SPARC researcher mode for focused research
./claude-flow sparc run researcher "Analyze React vs Vue vs Angular performance characteristics"

# Store findings in memory for later use
./claude-flow memory store "research_findings" "Key insights from framework analysis"
```

### Development Workflow
```bash
# Start orchestration system with web UI
./claude-flow start --ui --port 3000

# Run TDD workflow for new feature
./claude-flow sparc tdd "User authentication system with JWT tokens"

# Development swarm for complex projects
./claude-flow swarm "Build e-commerce API with payment integration" --strategy development --mode hierarchical --max-agents 8 --monitor

# Check system status
./claude-flow status
```

### Analysis Workflow
```bash
# Analyze codebase performance
./claude-flow sparc run analyzer "Identify performance bottlenecks in current codebase"

# Data analysis swarm
./claude-flow swarm "Analyze user behavior patterns from logs" --strategy analysis --mode mesh --parallel --output sqlite

# Store analysis results
./claude-flow memory store "performance_analysis" "Bottlenecks identified in database queries"
```

### Maintenance Workflow
```bash
# System maintenance with safety controls
./claude-flow swarm "Update dependencies and security patches" --strategy maintenance --mode centralized --monitor

# Security review
./claude-flow sparc run reviewer "Security audit of authentication system"

# Export maintenance logs
./claude-flow memory export maintenance_log.json
```

## Integration Patterns

### Memory-Driven Coordination
Use Memory to coordinate information across multiple SPARC modes and swarm operations:

```bash
# Store architecture decisions
./claude-flow memory store "system_architecture" "Microservices with API Gateway pattern"

# All subsequent operations can reference this decision
./claude-flow sparc run coder "Implement user service based on system_architecture in memory"
./claude-flow sparc run tester "Create integration tests for microservices architecture"
```

### Multi-Stage Development
Coordinate complex development through staged execution:

```bash
# Stage 1: Research and planning
./claude-flow sparc run researcher "Research authentication best practices"
./claude-flow sparc run architect "Design authentication system architecture"

# Stage 2: Implementation
./claude-flow sparc tdd "User registration and login functionality"
./claude-flow sparc run coder "Implement JWT token management"

# Stage 3: Testing and deployment
./claude-flow sparc run tester "Comprehensive security testing"
./claude-flow swarm "Deploy authentication system" --strategy maintenance --mode centralized
```

### Enterprise Integration
For enterprise environments with additional tooling:

```bash
# Project management integration
./claude-flow project create "authentication-system"
./claude-flow project switch "authentication-system"

# Security compliance
./claude-flow security scan
./claude-flow security audit

# Analytics and monitoring
./claude-flow analytics dashboard
./claude-flow deploy production --monitor
```

## Advanced Batch Tool Patterns

### TodoWrite Coordination
Always use TodoWrite for complex task coordination:

```javascript
TodoWrite([
  {
    id: "architecture_design",
    content: "Design system architecture and component interfaces",
    status: "pending",
    priority: "high",
    dependencies: [],
    estimatedTime: "60min",
    assignedAgent: "architect"
  },
  {
    id: "frontend_development", 
    content: "Develop React components and user interface",
    status: "pending",
    priority: "medium",
    dependencies: ["architecture_design"],
    estimatedTime: "120min",
    assignedAgent: "frontend_team"
  }
]);
```

### Task and Memory Integration
Launch coordinated agents with shared memory:

```javascript
// Store architecture in memory
Task("System Architect", "Design architecture and store specs in Memory");

// Other agents use memory for coordination
Task("Frontend Team", "Develop UI using Memory architecture specs");
Task("Backend Team", "Implement APIs according to Memory specifications");
```

## Code Style Preferences
- Use ES modules (import/export) syntax
- Destructure imports when possible
- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Use async/await instead of Promise chains
- Prefer const/let over var

## Workflow Guidelines
- Always run typecheck after making code changes
- Run tests before committing changes
- Use meaningful commit messages
- Create feature branches for new functionality
- Ensure all tests pass before merging

## Important Notes
- **Use TodoWrite extensively** for all complex task coordination
- **Leverage Task tool** for parallel agent execution on independent work
- **Store all important information in Memory** for cross-agent coordination
- **Use batch file operations** whenever reading/writing multiple files
- **Check .claude/commands/** for detailed command documentation
- **All swarm operations include automatic batch tool coordination**
- **Monitor progress** with TodoRead during long-running operations
- **Enable parallel execution** with --parallel flags for maximum efficiency

This configuration ensures optimal use of Claude Code's batch tools for swarm orchestration and parallel task execution with full Claude-Flow capabilities.


## Проект: AI Боты LiveKit с RunPod интеграцией

### Описание проекта
Клиент для общения с AI ботами по различным сценариям. Система позволяет управлять ботами, размещенными на сервисе RunPod, и подключаться к ним через LiveKit для видеоконференций.

### ✅ Реализованный функционал

#### 1. Аутентификация ✅ ГОТОВО
- **Реализовано**: Простая авторизация с хардкодом на серверной части Next.js
- **Файлы**: 
  - `/middleware.ts` - проверка авторизации для всех защищенных маршрутов
  - `/app/login/page.tsx` - страница входа с паролем
  - `/app/api/auth/route.ts` - API для проверки пароля и установки cookie
- **Функции**: Закрытие страницы от нежелательных лиц через cookie-based аутентификацию

#### 2. Управление ботами через RunPod ✅ ГОТОВО
- **Реализовано**: Полная интеграция с RunPod API для управления подами
- **Файлы**:
  - `/app/api/runpod/pods/route.ts` - список и создание подов
  - `/app/api/runpod/pods/[podId]/route.ts` - получение информации о поде
  - `/app/api/runpod/pods/[podId]/start/route.ts` - запуск пода
  - `/app/api/runpod/pods/[podId]/stop/route.ts` - остановка пода
  - `/hooks/use-livekit-bots.ts` - React Query хуки для клиентской части
  - `/types/runpod.ts` - TypeScript типы для RunPod API
- **Функции**: 
  - Автоматическое обнаружение подов с префиксом "livekit_"
  - Кнопки "Разбудить" для запуска остановленных подов
  - Кнопки "Войти в комнату" для готовых подов
  - Кнопки "Остановить" для работающих подов
  - Статусы подов в реальном времени

#### 3. LiveKit интеграция ✅ ГОТОВО
- **Реализовано**: Полная интеграция с LiveKit для видеоконференций
- **Файлы**:
  - `/app/custom/page.tsx` - прямое подключение к LiveKit с параметрами
  - `/app/custom/VideoConferenceClientImpl.tsx` - компонент видеоконференции
  - `/app/rooms/[roomName]/page.tsx` - стандартные комнаты LiveKit
  - `/app/rooms/[roomName]/PageClientImpl.tsx` - компонент комнаты
- **Функции**:
  - Автоматическое подключение к LiveKit комнатам
  - Поддержка видео/аудио конференций
  - E2EE шифрование (опционально)
  - Автоматическое отключение подов при выходе из комнаты

#### 4. Автоматическое управление жизненным циклом ✅ ГОТОВО
- **Реализовано**: Автоматическая остановка подов при выходе пользователя
- **Функции**:
  - Остановка пода при нажатии кнопки "Leave" в комнате
  - Остановка пода при закрытии браузера (через `navigator.sendBeacon`)
  - Остановка пода при отключении от комнаты (событие `disconnected`)
  - Навигация обратно к списку ботов после выхода

### 🏗️ Архитектура системы

#### Серверная часть (Next.js API Routes)
```
/app/api/
├── auth/route.ts              # Аутентификация
└── runpod/
    └── pods/
        ├── route.ts           # GET /api/runpod/pods - список подов
        ├── [podId]/
        │   ├── route.ts       # GET /api/runpod/pods/{id} - информация о поде
        │   ├── start/route.ts # POST /api/runpod/pods/{id}/start - запуск
        │   └── stop/route.ts  # POST /api/runpod/pods/{id}/stop - остановка
```

#### Клиентская часть
```
/app/
├── page.tsx                   # Главная страница со списком ботов
├── login/page.tsx            # Страница входа
├── custom/                   # Прямое подключение к LiveKit
│   ├── page.tsx
│   └── VideoConferenceClientImpl.tsx
└── rooms/[roomName]/         # Стандартные LiveKit комнаты
    ├── page.tsx
    └── PageClientImpl.tsx
```

#### Утилиты и хуки
```
/hooks/
├── use-livekit-bots.ts       # React Query хуки для работы с ботами
└── use-bot-control.ts        # Хуки для управления отдельными ботами

/types/
└── runpod.ts                 # TypeScript типы для RunPod API
```

### 🔄 Поток работы пользователя

1. **Вход в систему** → `/login` → ввод пароля → cookie установлена
2. **Список ботов** → `/` → отображение подов с префиксом "livekit_"
3. **Запуск бота** → кнопка "Разбудить" → API вызов `/api/runpod/pods/{id}/start`
4. **Ожидание готовности** → статус меняется на "Готов"
5. **Вход в комнату** → кнопка "Войти в комнату" → переход в `/custom/?liveKitUrl=...&token=...&podId=...`
6. **Видеоконференция** → автоматическое подключение к LiveKit → бот автоматически подключается
7. **Выход из комнаты** → кнопка "Leave" → автоматическая остановка пода → возврат к списку ботов

### 🔧 Настройки окружения

#### Переменные среды
```bash
# RunPod API
RUNPOD_API_KEY=your_runpod_api_key

# LiveKit (для автоматического подключения)
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-server
NEXT_PUBLIC_LIVEKIT_API_TOKEN=your_jwt_token

# Аутентификация
AUTH_PASSWORD=your_hardcoded_password
```

### 📋 Статус задач
- ✅ **Задача 1**: Простая авторизация хардкодом - **ЗАВЕРШЕНО**
- ✅ **Задача 2**: Страница с ботами и управление RunPod - **ЗАВЕРШЕНО**  
- ✅ **Задача 3**: Типизированные хуки для RunPod - **ЗАВЕРШЕНО**
- ✅ **Дополнительно**: LiveKit интеграция - **ЗАВЕРШЕНО**
- ✅ **Дополнительно**: Автоматическое управление жизненным циклом - **ЗАВЕРШЕНО**

### 🎯 Готово к использованию
Система полностью функциональна и готова к продакшену. Все основные компоненты реализованы и протестированы.


