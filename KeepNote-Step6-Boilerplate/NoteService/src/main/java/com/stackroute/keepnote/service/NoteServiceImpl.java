package com.stackroute.keepnote.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;

/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */

@Service
public class NoteServiceImpl implements NoteService {

	/*
	 * Autowiring should be implemented for the NoteRepository and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */

	private NoteRepository noteRepository;

	@Autowired
	public NoteServiceImpl(NoteRepository noteRepository) {
		this.noteRepository = noteRepository;
	}

	/*
	 * This method should be used to save a new note.
	 */
	public boolean createNote(Note note) {
		
		System.out.println("########### within NoteServiceImpl createNote "+note.toString());
		String userId = String.valueOf(note.getNoteCreatedBy());
		Optional<NoteUser> noteUser = noteRepository.findById(userId);

		System.out.println("$$$$$ userId: "+userId);
		
		if (noteUser.isPresent()) {
			System.out.println("Within Iffffffff update old "+note.toString());
			NoteUser noteUserTemp = noteUser.get();
//			List<Note> notes = new ArrayList<Note>();
			List<Note> notes = noteUserTemp.getNotes();
			Note maxNoteId = Collections.max(notes, Comparator.comparing(i -> i.getNoteId()));
			note.setNoteId(maxNoteId.getNoteId()+1);
			note.setNoteStatus(note.getNoteStatus());
			note.setNoteReminders(note.getNoteReminders());
			System.out.println("Within Iffffffff update after set noteId "+note.toString());
			notes.add(note);
			noteUserTemp.setNotes(notes);

			NoteUser updateNoteUser = noteRepository.save(noteUserTemp);
			if (updateNoteUser != null) {
				return true;
			} else {
				return false;
			}
		}

		else {
			System.out.println("Within elsesssss create new ");
			NoteUser noteUser1 = new NoteUser();
			List<Note> notes = new ArrayList<Note>();
			note.setNoteId(1);
			notes.add(note);
			noteUser1.setUserId(userId);
			noteUser1.setNotes(notes);

			NoteUser createdNoteUser = noteRepository.insert(noteUser1);
			if (createdNoteUser != null) {
				return true;
			} else {
				return false;
			}
		}
	}

	/* This method should be used to delete an existing note. */

	public boolean deleteNote(String userId, Integer noteId) {

		System.out.println("#### Within NoteSeriviceImpl deleteNote ");

		NoteUser noteUser = noteRepository.findById(userId).get();
		if (null != noteUser) {
			try {
//				noteRepository.deleteById(noteUser.getUserId());
				List<Note> notes = noteUser.getNotes();
				notes.removeIf(n -> n.getNoteId() == noteId);
				noteUser.setNotes(notes);
				noteRepository.save(noteUser);
				return true;
			}
			catch(Exception e) {
				e.printStackTrace();
				System.out.println(e.getMessage());
			}
			
		}
		return false;
		/*List<Note> notes = noteUser.getNotes();
		notes.removeIf(n -> n.getNoteId() == noteId);
		if (noteUser != null && notes != null) {
			System.out.println("#### Within NoteSeriviceImpl deleteNote note "+notes.toString());
			for(Note note :notes) {
				if(noteId == note.getNoteId()) {
				note.setNoteId(0);
				note.setNoteTitle(null);
				note.setNoteContent(null);
				note.setNoteStatus(null);
				note.setNoteCreatedBy(null);
				}
			}
			noteUser.setNotes(notes);
			noteRepository.save(noteUser);
			return true;
		}
		return false;*/

	}

	/* This method should be used to delete all notes with specific userId. */

	public boolean deleteAllNotes(String userId) {
		
		System.out.println("#### Within NoteSeriviceImpl deleteAllNotes ");

		NoteUser noteUser = noteRepository.findById(userId).get();

		if (noteUser != null) {
			noteRepository.delete(noteUser);
			return true;
		}
		return false;
	}

	/*
	 * This method should be used to update a existing note.
	 */
	public Note updateNote(Note note, int id, String userId) throws NoteNotFoundExeption {
		
		System.out.println("#### Within NoteServiceImpl updateNote note -- "+note.toString());
		try {
			NoteUser noteUser = noteRepository.findById(userId).get();
			List<Note> notes = noteUser.getNotes();
			List<Note> newNotes = new ArrayList<Note>();
			for(Note n : notes) {
				if(id == n.getNoteId()) {
					n.setNoteTitle(note.getNoteTitle());
					n.setNoteContent(note.getNoteContent());
					n.setNoteStatus(note.getNoteStatus());
					n.setNoteReminders(note.getNoteReminders());
				}
				newNotes.add(n);
			}
			noteUser.setNotes(newNotes);
			System.out.println("#### Within NoteServiceImpl after updateNote noteUser -- "+noteUser.toString());
			noteRepository.save(noteUser);
			return this.getNoteByNoteId(userId, id);
		}
		
		catch (Exception e) {
			throw new NoteNotFoundExeption("Note not found");
		}

		/*try {
			NoteUser noteUser = noteRepository.findById(userId).get();
			
			System.out.println("#### Within NoteServiceImpl updateNote noteUser "+noteUser.toString());
			Note noteData = getNoteByNoteId(userId, id);
			System.out.println("#### Within NoteServiceImpl updateNote noteData -- "+noteData.toString());
			noteData.setNoteTitle(note.getNoteTitle());
			noteData.setNoteContent(note.getNoteContent());
			
			List<Note> notes = noteUser.getNotes();
			notes.add(noteData);
			noteUser.setNotes(notes);
			noteRepository.save(noteUser);
			return noteData;

		} catch (Exception e) {
			throw new NoteNotFoundExeption("Note not found");
		}*/
	}

	/*
	 * This method should be used to get a note by noteId created by specific user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {

		System.out.println("########## Within NoteServiceImpl getNoteByNoteId ");
		Optional<Note> note = null;
		try {
			NoteUser noteUser = noteRepository.findById(userId).get();
			List<Note> notes = noteUser.getNotes();

			if (noteUser != null && notes != null) {
				note = notes.stream().filter(noteData -> noteData.getNoteId() == noteId).findFirst();
				
				System.out.println("########## Within NoteServiceImpl getNoteByNoteId note - "+note.toString());
			}

		} catch (Exception e) {
			throw new NoteNotFoundExeption("Note not found");
		}
		return note.orElseThrow(() -> new NoteNotFoundExeption("Note not found"));
	}

	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {

		return noteRepository.findById(userId).get().getNotes();
	}

}
