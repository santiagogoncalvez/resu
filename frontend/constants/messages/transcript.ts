export const TRANSCRIPT_MESSAGES = {
   ERROR: {
      VIDEO_ID_REQUIRED: "Debes ingresar un video de YouTube.",
      EMPTY: "No se encontró una transcripción para este video.",
      TIMEOUT:
         "La solicitud de la transcripción tardó demasiado. Inténtalo nuevamente.",
      PRIVATE_VIDEO:
         "Este video es privado y no se puede acceder a su contenido.",
      INVALID_VIDEO_ID: "El identificador del video de YouTube no es válido.",
      NOT_FOUND: "No se encontró una transcripción para este video.",
      RATE_LIMIT:
         "El servicio de transcripciones alcanzó su límite de solicitudes. Inténtalo más tarde.",
      QUOTA_EXCEEDED:
         "Llegamos al límite de videos por hoy. Volvé a probar mañana.",
      UNAUTHORIZED:
         "El servicio de videos no está disponible ahora. Probá más tarde.",
      SERVICE_UNAVAILABLE:
         "El servicio de transcripciones no está disponible temporalmente.",
      FETCH_FAILED: "No se pudo obtener la transcripción.",
      UNKNOWN: "Ocurrió un error al obtener la transcripción.",
      NO_TRANSCRIPT:
         "Este video no tiene subtítulos o una transcripción disponible.",
   },
} as const;
