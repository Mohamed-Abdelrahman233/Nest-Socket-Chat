##  Real-Time Chat System (WebSockets)
A high-performance chat module integrated into the e-commerce ecosystem, enabling instant communication between users.

**Features:**
* **Instant Messaging:** Real-time private messaging using **Socket.io** for low-latency communication.
* **Room Management:** Dynamic room creation for private chats or order-related discussions.
* **Live Status:** Real-time "Typing..." indicators and online/offline status tracking.
* **Event-Driven Architecture:** Handled via NestJS Gateways for clean and scalable socket management.
* **Security:** WebSocket connections are secured via **JWT Authentication** (Handshake level).

**Socket Events:**
| Event | Description |
| :--- | :--- |
| `connection` | Establishes a secure link with the client. |
| `join_chat` | Joins a specific conversation room. |
| `send_message` | Emits a message to a specific user/room. |
| `receive_message` | Listens for incoming real-time messages. |
| `typing_status` | Broadcasts if the other party is currently typing. |

**Tech for Sockets:**
- **Gateway:** NestJS WebSockets Module.
- **Adapter:** Socket.io.
- **State Management:** (Optional) Redis for scaling multiple socket instances.
