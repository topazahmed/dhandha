import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';

export const setupSocketIO = (io: Server) => {
  // Middleware for socket authentication
  io.use((socket: any, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: any) => {
    console.log(`User ${socket.userId} connected`);

    // Join user to their personal room
    socket.join(`user_${socket.userId}`);

    // Handle joining task-specific chat rooms
    socket.on('join_task_chat', (taskId: string) => {
      socket.join(`task_${taskId}`);
      console.log(`User ${socket.userId} joined task chat: ${taskId}`);
    });

    // Handle leaving task-specific chat rooms
    socket.on('leave_task_chat', (taskId: string) => {
      socket.leave(`task_${taskId}`);
      console.log(`User ${socket.userId} left task chat: ${taskId}`);
    });

    // Handle sending messages
    socket.on('send_message', (data: {
      taskId: string;
      receiverId: string;
      content: string;
    }) => {
      // Emit to task chat room
      socket.to(`task_${data.taskId}`).emit('new_message', {
        taskId: data.taskId,
        senderId: socket.userId,
        content: data.content,
        timestamp: new Date(),
      });

      // Also emit to receiver's personal room
      socket.to(`user_${data.receiverId}`).emit('new_message', {
        taskId: data.taskId,
        senderId: socket.userId,
        content: data.content,
        timestamp: new Date(),
      });
    });

    // Handle task updates
    socket.on('task_update', (data: {
      taskId: string;
      status: string;
      message?: string;
    }) => {
      socket.to(`task_${data.taskId}`).emit('task_updated', data);
    });

    // Handle typing indicators
    socket.on('typing_start', (data: { taskId: string; receiverId: string }) => {
      socket.to(`user_${data.receiverId}`).emit('user_typing', {
        taskId: data.taskId,
        userId: socket.userId,
        typing: true,
      });
    });

    socket.on('typing_stop', (data: { taskId: string; receiverId: string }) => {
      socket.to(`user_${data.receiverId}`).emit('user_typing', {
        taskId: data.taskId,
        userId: socket.userId,
        typing: false,
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });

  return io;
};