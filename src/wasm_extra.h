#if defined(NEED_WASM_EXTRA_H) && !defined(WASM_EXTRA_H)
#define WASM_EXTRA_H

#include <wctype.h>

#ifndef UINT8_MAX
#define UINT8_MAX 255
#endif

char *strncpy(char *string1, const char *string2, size_t count);
size_t strlen(const char *string);

static inline wint_t towupper(wint_t c) {
    if (c >= 'a' && c <= 'z') {
        return (c - 'a') + 'A';
    }
    return c;
}

#endif  // WASM_EXTRA_H
