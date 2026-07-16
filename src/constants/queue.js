export const QueueStatus = {

    WAITING: "WAITING",

    RUNNING: "RUNNING",

    SUCCESS: "SUCCESS",

    FAILED: "FAILED",

    CANCELLED: "CANCELLED"

};

export const QueuePriority = {

    LOW: 1,

    NORMAL: 5,

    HIGH: 10,

    CRITICAL: 100

};

export default {

    QueueStatus,

    QueuePriority

};