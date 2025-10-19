import { supabase } from "@/integrations/supabase/client";
import { QuizAnswers, OnsenType } from "@/types/onsen";
import { getSessionId } from "./sessionManager";
import { getDeviceType, getReferrerDomain } from "./analytics";

/**
 * Save a single quiz answer to the database
 */
export async function saveQuizAnswer(
  questionId: number,
  selectedOptionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const sessionId = getSessionId();
    
    const { error } = await supabase
      .from('quiz_attempts')
      .insert({
        session_id: sessionId,
        question_id: questionId,
        selected_option_id: selectedOptionId,
      });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error saving quiz answer:', error);
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Unexpected error saving quiz answer:', error);
    }
    return { success: false, error: 'Error inesperado al guardar la respuesta' };
  }
}

/**
 * Save the final quiz result to the database
 */
export async function saveQuizResult(
  onsenType: OnsenType,
  answers: QuizAnswers,
  timeSpentSeconds?: number | null
): Promise<{ success: boolean; error?: string }> {
  try {
    const sessionId = getSessionId();
    
    const { error } = await supabase
      .from('quiz_results')
      .insert({
        session_id: sessionId,
        onsen_type: onsenType,
        answers: answers,
        time_spent_seconds: timeSpentSeconds,
        device_type: getDeviceType(),
        referrer_domain: getReferrerDomain(),
      });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error saving quiz result:', error);
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Unexpected error saving quiz result:', error);
    }
    return { success: false, error: 'Error inesperado al guardar el resultado' };
  }
}

/**
 * Get previous quiz results for the current session
 */
export async function getSessionResults(): Promise<{
  success: boolean;
  results?: any[];
  error?: string;
}> {
  try {
    const sessionId = getSessionId();
    
    const { data, error } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });

    if (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching session results:', error);
      }
      return { success: false, error: error.message };
    }

    return { success: true, results: data };
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Unexpected error fetching session results:', error);
    }
    return { success: false, error: 'Error al cargar resultados anteriores' };
  }
}
