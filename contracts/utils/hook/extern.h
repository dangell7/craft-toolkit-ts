#include <stdint.h>
#ifndef HOOK_EXTERN

// UTIL
extern int32_t
getLedgerSqn(void);

extern int32_t
trace(int32_t read_ptr, int32_t read_len);

extern int64_t
traceNumber(int32_t read_ptr, int32_t read_len, int64_t number);

#define HOOK_EXTERN
#endif  // HOOK_EXTERN
